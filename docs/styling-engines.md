# 🕴️ Styling engines

### Using UIToolkit in external windows 🪟
UIToolkit's `Dropdown` and `Tooltip` components have libraries (`popperjs` and `react-select`) that inject styling with `@emotion`. If you try using these components in a a window outside the main one (e.g. popout) the styling will only be applied to the main document.

So if you are using UIToolkit in external windows you need to wrap it in a `CacheProvider` with the container argument set to the document where the styling will be implemented. For example:

```
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';

const emotionCache = createCache({
    container: popoutDocument.head,
    key: 'unique-key-if-using-multiple-caches'
});

return (
    <CacheProvider value={ emotionCache }>
        <Dropdown/>
        <Tooltip/>
    </CacheProvider>
);
```

### Adding styling engines ➕
If we add a new styling engine, we need to add documentation for how to create an injection point for that specific styling engine.

Any package using UIToolkit with a popout window needs to be notified so they can update accordingly.