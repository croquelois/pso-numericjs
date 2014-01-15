#bfgs-numericjs

optimisation with pso, implemented using [numericjs] (http://www.numericjs.com)

##use:

```js
numeric.pso(dim,objective,up,down,opt);
```

dim: dimension of the problem

objective: an object with one attribute, 'f' your function to optimise

up: an array of dimension 'dim', upper limit of the domain

down: an array of dimension 'dim', lower limit of the domain

opt: an optional argument with the following atributes:

-nbRun: number of run (default: 3)

-nbAgent: number of agent (default: 20)

-nbIter: number of iteration (default: 500)

-weight: speed decrease at the first iteration, then linear to 0.4 for the last one

-c1: personal influence

-c2: social influence

##example


```js
function sqr(x){ return x*x; };
function f(arg){
  var x = arg[0];
  var y = arg[1];
  return sqr(10*(y-x*x)) + sqr(1-x);
}

var ret = numeric.pso(2,{f:f},[5,5],[-5,-5]);
```