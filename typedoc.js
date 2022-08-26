module.exports = {
  entryPoints: [
    "./src/MAryTree.ts",
    "./src/positioning-algorithms/Walker/calculateCoordinates.ts",
    "./src/positioning-algorithms/Ploeg/calculateCoordinates.ts",
  ],
  plugin: ["typedoc-plugin-markdown"],
  hideBreadcrumbs: true,
  readme: "none"
}
