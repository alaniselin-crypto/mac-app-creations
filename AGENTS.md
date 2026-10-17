<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Prepare iOS with `npm run prepare:ios` before archiving; it syncs Capacitor and checks the generated Google provider configuration to prevent stale native login settings.
- Keep the Numismatik SKU allocation, reset, import and deletion-number logic unchanged unless the user expressly requests a SKU correction; the confirmed v23 behavior is the reference.
