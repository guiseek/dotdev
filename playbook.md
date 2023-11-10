```sh
nx g @nx/angular:application --name=content --bundler=webpack --inlineStyle=true --inlineTemplate=true --minimal=true --projectNameAndRootFormat=derived --ssr=true --style=scss --tags=type:app,scope:content,side:client
```

```sh
nx test content
```

```sh
nx e2e content-e2e
```

```sh
nx serve content
```