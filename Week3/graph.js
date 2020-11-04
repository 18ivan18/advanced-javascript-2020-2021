function Graph(v) {
    this.V = v;
    this.E = [];
    for (let i = 0; i < v; i++) {
        this.E[i] = new Array();
    }
}

Graph.prototype.addVertex = function(v, w) {
    this.E[v].push(w);
    this.E[w].push(v);
}

Graph.prototype.removeVertex = function(v, w) {
    this.E[v] = E[v].filter(el => el !== w);
    this.E[w] = E[w].filter(el => el !== v);;
}

const main = () => {
    console.log("Graph...");
    const g = new Graph(5);
    g.addVertex(1, 2);
    g.addVertex(1, 3);
    g.addVertex(0, 1);
    g.removeVertex(1, 3);
}

main();