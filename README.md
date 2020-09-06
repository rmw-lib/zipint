# @rmw/zipint

This is an integer encodeion library in JavaScript, useful for work on indexes.
Given an array of small integers, it produces an ArrayBuffer that uses far fewer bytes
than the original (using VByte encodeion). It assumes a modern JavaScript engine with
typed arrays.
 
From the encodeed data, you can later recover the original  array quickly 
(at a rate of millions of integers per second).


```javascript
   // var FastIntegerCompression = require("fastintcompression");// if you use node
   var array = [10,100000,65999,10,10,0,1,1,2000,0xFFFFFFFF];
   var buf = FastIntegerCompression.compress(array);
   var back = FastIntegerCompression.uncompress(buf); // gets back [10,100000,65999,10,10,0,1,1,2000]
``` 

By default, non-negative 32-bit integers are expected. If you have signed (negative and positive) 32-bit integers, then you must use distinct functions since we need to code the sign bit:


```javascript
   // var zipint = require("@rmw/zipint");// if you use node
   var array = [10,100000,65999,10,10,0,-1,-1,-2000];
   var buf = zipint.encodeSigned(array);
   var back = zipint.decodeSigned(buf); // gets back [10,100000,65999,10,10,0,-1,-1,-2000]
``` 


You can install the library under node with the command line
```bash
   npm install @rmw/zipint
```

This code is made available under the Apache License 2.0.

## Suitability 

This library is meant to encode arrays of small integers. It is not meant to
encode text documents or arrays of large (or random) integers.

## Performance numbers

Go to benchmark repository (check the README.md file) and run the benchmark:

```bash
$ node test.js
Platform: linux 3.13.0-91-generic x64
Intel(R) Core(TM) i7-4770 CPU @ 3.40GHz
Node version 4.5.0, v8 version 4.5.103.37

input size: 7.813K encodeed size: 1000B
zipint.encode x 337,845 ops/sec ±0.93% (92 runs sampled)
Fastest is zipint.encode
zipint.decode x 187,694 ops/sec ±0.72% (93 runs sampled)
Fastest is zipint.decode
```

These numbers means that we can decode 187,694 1000-integer arrays per second.
That's 187 millions of integers per second.

## You might also like...

If you like this library, you might also like 
- https://github.com/lemire/FastPriorityQueue.js
- https://github.com/lemire/StablePriorityQueue.js
- https://github.com/lemire/FastBitSet.js
