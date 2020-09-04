/* This script expects node.js  and mocha */


import * as zipint from "../index.mjs";

describe('zipint', function() {


  function arraysEquals(a, b) {
    var i = a.length;
    if (i != b.length) return false;
    while (i--) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  };

  it('Testing simple encodeion', function() {
    var array = [10,100000,65999,10,10,0,1,1,2000, 0xFFFFFFFF];
    var buf = zipint.encode(array);
    if(! zipint.computeHowManyIntegers(buf) == array.length) throw "bad count";
    var back = zipint.decode(buf);
    if(!arraysEquals(array,back)) throw "bad";
  });



  it('Testing simple encodeion (signed)', function() {
    var array = [10,100000,65999,10,10,0,-1,-1,-2000];
    var buf = zipint.encodeSigned(array);
    if(! zipint.computeHowManyIntegers(buf) == array.length) throw "bad count";
    var back = zipint.decodeSigned(buf);
    if(!arraysEquals(array,back)) throw "bad";

  });
});
