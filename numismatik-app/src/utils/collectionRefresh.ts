export interface CollectionRefreshDependencies {
  refresh: () => Promise<void>;
  subscribe: (changed: () => void, failed: (error: unknown) => void) => () => void;
  onError: (error: unknown) => void;
}

/** Coalesce remote notifications; never replay local writes from a listener. */
export function startCollectionRefresh(dependencies: CollectionRefreshDependencies) {
  let stopped = false;
  let running = false;
  let requested = false;

  const request = async (): Promise<void> => {
    if (stopped) return;
    requested = true;
    if (running) return;
    running = true;
    try {
      while (requested && !stopped) {
        requested = false;
        try {
          await dependencies.refresh();
        } catch (error) {
          if (!stopped) dependencies.onError(error);
        }
      }
    } finally {
      running = false;
    }
  };

  const unsubscribe = dependencies.subscribe(() => { void request(); }, dependencies.onError);
  return {
    request,
    stop: () => {
      stopped = true;
      unsubscribe();
    },
  };
}