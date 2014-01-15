"use strict";
(function(exports){
function pso(dim,obj,up,down,opt){
  opt = opt || {};
  var nbRun = opt.nbRun || 3;
  var nbAgents = opt.nbAgent || 20;
  var weight = opt.weight || 0.9;
  var nbIter = opt.nbIter || 500;
  var c1 = opt.c1 || 1.5; // personal influence
  var c2 = opt.c2 || 1.5; // social influence
  var bestScore;
  var bestAgent;
  var rnd = Math.random;
  var fct = obj.f;
  var rng = [];
  for(var d=0;d<dim;d++) rng[d] = up[d]-down[d];
  function uniform(a,b){ return rnd()*(b-a)+a; }
  
  for(var i=0;i<nbRun;i++){
    var agents = [];
    for(var a=0;a<nbAgents;a++) agents.push({x:[],v:[]});
    agents.forEach(function(a){
      for(var d=0;d<dim;d++){
        a.x[d] = uniform(down[d],up[d]);
        a.v[d] = uniform(-rng[d],rng[d]);
      }
    });

    var iter = 0;
    var gbest = agents[0];
    while(iter < nbIter){
      iter++;
      var weightUp = (weight-0.4) * (nbIter - iter)/nbIter + 0.4;
      agents.forEach(function(a){
        a.f = fct(a.x);
        if(a.best === undefined || a.f < a.best){
          a.best = a.f;
          a.bestx = a.x;
          if(a.best < gbest.best){
            gbest = a;
            if(bestScore == undefined || bestScore > a.best){
              bestScore = a.best;
              bestAgent = a;
            }
          }
        }
        a.tx = a.x.slice();
        for(var b=0;b<dim;b++){
          a.v[b] *= weightUp;
          a.v[b] += c1*rnd()*(a.bestx[b]-a.x[b]) + c2*rnd()*(gbest.bestx[b]-a.x[b]);
          if(a.v[b] > rng[b]) a.v[b] = rng[b];
          else if(a.v[b] < -rng[b]) a.v[b] = -rng[b];
          a.tx[b] += a.v[b];
          if(a.tx[b] > up[b]) a.tx[b] = up[b];
          if(a.tx[b] < down[b]) a.tx[b] = down[b];
        }
      });
      agents.forEach(function(a){ a.x = a.tx; });
    }
  }
  return bestAgent;
}

exports.pso = pso;
}(numeric));

