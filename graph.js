class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex)
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for(let node of vertexArray){
      this.nodes.add(node)
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2)
    v2.adjacent.add(v1)
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2)
    v2.adjacent.delete(v1)
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    this.nodes.delete(vertex)
    for(let node of this.nodes){
      if(node.adjacent.has(vertex)){
        node.adjacent.delete(vertex)
      }
    }
  }
  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    let toVisitStack = [start];
    let visited = new Set(toVisitStack)
    while(toVisitStack.length > 0){
      let currVertex = toVisitStack.pop();
      for(let vertex of currVertex.adjacent){
        if(!visited.has(vertex)) {
          toVisitStack.push(vertex)
          visited.add(vertex)
        }
      }
    }
    return [...visited].map(vertex => vertex.value)
  }
  // depthFirstSearch(start, seen=new Set([start])){
  //   for (let vertex of start.adjacent){
  //     if(!seen.has(vertex)){
  //       seen.add(vertex)
  //       this.depthFirstSearch(vertex, seen)
  //     }
  //   }
  //   return [...seen].map(vertex => vertex.value)
  // }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    let toVisitQueue = [start];
    let visited = new Set(toVisitQueue)
    while(toVisitQueue.length > 0){
      let currVertex = toVisitQueue.shift();
      for(let vertex of currVertex.adjacent){
        if(!visited.has(vertex)){
          toVisitQueue.push(vertex)
          visited.add(vertex)
        }
      }
    }
    return [...visited].map(vertex => vertex.value)
  }
}

module.exports = {Graph, Node}