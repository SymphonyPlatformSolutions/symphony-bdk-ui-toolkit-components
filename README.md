# ⚛️SymphonyBDK - UI Toolkit Components

The React components library of Symphony`s design system  
  
[![Test Coverage](https://api.codeclimate.com/v1/badges/6eede5cf90ef1734f560/test_coverage)](https://codeclimate.com/github/SymphonyPlatformSolutions/symphony-bdk-ui-toolkit-components/test_coverage)

## Requirements

- Node 10+
- Yarn

## 🛠 Install

Run

```
yarn
```

## 🛸 Explore the existing components using the StoryBook

```
yarn start
```

## 🧪 Tests and coverage

```
yarn test
```

## 🏎️ Setup on your React project

```
yarn add @symphony-ui/uitoolkit-components
```

```
import { Button } from "@symphony-ui/uitoolkit-components/components";
```

## 🕴️ Styling engines

### Using uitoolkit in popout windows 🪟
uitoolkit `Dropdown` and `Tooltip` components have libraries that inject styling with `@emotion`. If you try using these components in a popped out window the styling will only be applied to the main document. So the components needs to be wrapped in a CacheProvider and pass the container argument where the styling will be implemented. For example:

```
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';

const emotionCache = createCache({
    container: popoutDocument.head
});

return (
    <CacheProvider value={ emotionCache }>
        <Dropdown/>
        <Tooltip/>
    </CacheProvider>
);
```

### Adding styling engines
If we add a new styling engine, we need to add documentation for how to create an injection point for that specific styling engine.

Any package using uitoolkit with a popout window needs to be notified so they can update accordingly.

## 📦 Releasing from GitHub

Full releasing manual [here](https://perzoinc.atlassian.net/wiki/spaces/DevX/pages/1303478933/UIToolkit+releasing+and+versioning)

## 💪 Contributing

Read detailed guide on [contribution process](https://github.com/SymphonyOSF/symphony-bdk-ui-toolkit-components/blob/master/docs/contributing.md)
