var documenterSearchIndex = {"docs":
[{"location":"usage/#Usage","page":"Usage","title":"Usage","text":"","category":"section"},{"location":"usage/","page":"Usage","title":"Usage","text":"First, load the package:","category":"page"},{"location":"usage/","page":"Usage","title":"Usage","text":"using Hashing","category":"page"},{"location":"usage/#High-Level","page":"Usage","title":"High-Level","text":"","category":"section"},{"location":"usage/","page":"Usage","title":"Usage","text":"Working with the high-level interface is quite easy:","category":"page"},{"location":"usage/","page":"Usage","title":"Usage","text":"bytes2hex(sha3_224(\"Hash me!\"))","category":"page"},{"location":"usage/","page":"Usage","title":"Usage","text":"Or, to compute the file hash (of an empty file named filename):","category":"page"},{"location":"usage/","page":"Usage","title":"Usage","text":"filename = tempname() # hide\ntouch(filename) # hide\nbytes2hex(sha256(open(filename)))","category":"page"},{"location":"usage/","page":"Usage","title":"Usage","text":"Calculating HMAC's is similarly straightforward:","category":"page"},{"location":"usage/","page":"Usage","title":"Usage","text":"bytes2hex(hmac_sha256(\"some key\", \"some data\"))","category":"page"},{"location":"usage/","page":"Usage","title":"Usage","text":"The backend used to do the hashing can be specified with the keyword argument provider:","category":"page"},{"location":"usage/","page":"Usage","title":"Usage","text":"sha256(\"\"; provider = Hashing.OpenSSL) == sha256(\"\"; provider = Hashing.Libgcrypt)","category":"page"},{"location":"usage/","page":"Usage","title":"Usage","text":"Extracting a fixed number of bytes from an extendable-output function can be done either in one go","category":"page"},{"location":"usage/","page":"Usage","title":"Usage","text":"bytes2hex(shake256(\"Hash and extract me!\", 42))","category":"page"},{"location":"usage/","page":"Usage","title":"Usage","text":"or step by step:","category":"page"},{"location":"usage/","page":"Usage","title":"Usage","text":"xof = shake256(\"Hash and extract me!\")\nbytes2hex([digest!(xof, 10); digest!(xof, 10); digest!(xof, 22)])","category":"page"},{"location":"usage/#Low-Level","page":"Usage","title":"Low-Level","text":"","category":"section"},{"location":"usage/","page":"Usage","title":"Usage","text":"The low-level interface allows for more controlled operations.","category":"page"},{"location":"usage/","page":"Usage","title":"Usage","text":"Setting up a hash context, feeding it with some data, and finally computing the digest works as follows:","category":"page"},{"location":"usage/","page":"Usage","title":"Usage","text":"ctx = context(SHA3_224; provider = Hashing.Libgcrypt)\nupdate!(ctx, \"Hash \")\nupdate!(ctx, \"me!\")\nbytes2hex(digest!(ctx))","category":"page"},{"location":"usage/","page":"Usage","title":"Usage","text":"Or, in the case of an extendable-output function:","category":"page"},{"location":"usage/","page":"Usage","title":"Usage","text":"ctx = context(SHAKE256, \"Hash and \"; provider = Hashing.Libgcrypt)\nupdate!(ctx, IOBuffer(\"extract me!\"); buffersize = 2)\n[bytes2hex(digest!(ctx, 15)) for i ∈ 1:5]","category":"page"},{"location":"usage/","page":"Usage","title":"Usage","text":"To avoid unneccessary allocations, it's sometimes useful to be able to copy or reset hash contexts:","category":"page"},{"location":"usage/","page":"Usage","title":"Usage","text":"ctx = context(SHA3_224, \"Hash me!\")\nctx_copy = copy(ctx)\nreset!(ctx)\n[bytes2hex(digest!(ctx)), bytes2hex(digest!(ctx_copy))]","category":"page"},{"location":"usage/","page":"Usage","title":"Usage","text":"Dealing with HMAC objects is similar:","category":"page"},{"location":"usage/","page":"Usage","title":"Usage","text":"hmac = HMAC(SHA256, \"some key\")\nupdate!(hmac, \"some data\")\nbytes2hex(digest!(hmac))","category":"page"},{"location":"api_low/#Low-Level-Interface","page":"Low-Level Interface","title":"Low-Level Interface","text":"","category":"section"},{"location":"api_low/#One-Shot-Digests","page":"Low-Level Interface","title":"One-Shot Digests","text":"","category":"section"},{"location":"api_low/","page":"Low-Level Interface","title":"Low-Level Interface","text":"digest\nhmac_digest","category":"page"},{"location":"api_low/#Hashing.digest","page":"Low-Level Interface","title":"Hashing.digest","text":"digest(algoid, data[; provider, kwargs...])\n\nReturn the digest of data computed with the hash algorithm algoid.\n\n\n\n\n\ndigest(algoid, data, len[; provider, kwargs...])\n\nReturn the first len bytes of the digest of data computed with the XOF algorithm algoid.\n\n\n\n\n\n","category":"function"},{"location":"api_low/#Hashing.hmac_digest","page":"Low-Level Interface","title":"Hashing.hmac_digest","text":"hmac_digest(algoid, key, data[; provider, kwargs...])\n\nReturn the HMAC of data keyed with key computed with the hash algorithm algoid.\n\n\n\n\n\n","category":"function"},{"location":"api_low/#Hash-Contexts","page":"Low-Level Interface","title":"Hash Contexts","text":"","category":"section"},{"location":"api_low/","page":"Low-Level Interface","title":"Low-Level Interface","text":"HMAC\ncontext\nreset!\nupdate!\ndigest!","category":"page"},{"location":"api_low/#Hashing.HMAC","page":"Low-Level Interface","title":"Hashing.HMAC","text":"HMAC(algoid, key[; provider])\n\nReturn a new HMAC object keyed with key for the hash algorithm algoid.\n\n\n\n\n\n","category":"type"},{"location":"api_low/#Hashing.context","page":"Low-Level Interface","title":"Hashing.context","text":"context(algoid[; provider])\n\nReturn a new hash context for the algorithm algoid.\n\n\n\n\n\ncontext(algoid, data[; provider, kwargs...])\n\nReturn a new hash context for the algorithm algoid and initialize it with data.\n\n\n\n\n\n","category":"function"},{"location":"api_low/#Hashing.reset!","page":"Low-Level Interface","title":"Hashing.reset!","text":"reset!(ctx)\n\nReset the state of the hash context ctx. Afterwards, ctx can be used in the same way as a freshly created hash context with the same associated algorithm.\n\n\n\n\n\n","category":"function"},{"location":"api_low/#Hashing.update!","page":"Low-Level Interface","title":"Hashing.update!","text":"update!(obj, data[; provider, kwargs...])\n\nFeed data into the hash context or HMAC object obj.\n\nThe argument data can be of type AbstractVector{UInt8}, AbstractString, IO, or any other type that can be collected into a vector of bytes.\n\nWhen reading data of type IO, the buffer size can be set with the optional keyword argument buffersize.\n\n\n\n\n\n","category":"function"},{"location":"api_low/#Hashing.digest!","page":"Low-Level Interface","title":"Hashing.digest!","text":"digest!(obj)\n\nReturn the digest for the HMAC object or hash context obj of a hash algorithm.\n\nUnless reset! is called before, further calls to update! or digest! are not allowed.\n\ndigest!(ctx, len)\n\nReturn the next len bytes of the digest for the hash context ctx of an XOF algorithm.\n\nUnless reset! is called before, further calls to update! are not allowed. If the provider does not support streaming, further calls to digest! are forbidden, too.\n\n\n\n\n\n","category":"function"},{"location":"installation/#Installation","page":"Installation","title":"Installation","text":"","category":"section"},{"location":"installation/","page":"Installation","title":"Installation","text":"Install with the Julia package manager Pkg, just like any other registered Julia package:","category":"page"},{"location":"installation/","page":"Installation","title":"Installation","text":"pkg> add Hashing  # Press ']' to enter the Pkg REPL mode.","category":"page"},{"location":"installation/","page":"Installation","title":"Installation","text":"or","category":"page"},{"location":"installation/","page":"Installation","title":"Installation","text":"julia> using Pkg; Pkg.add(\"Hashing\")","category":"page"},{"location":"providers/#Providers","page":"Providers","title":"Providers","text":"","category":"section"},{"location":"providers/#Supported","page":"Providers","title":"Supported","text":"","category":"section"},{"location":"providers/","page":"Providers","title":"Providers","text":"Hashing.providers","category":"page"},{"location":"providers/#Hashing.providers","page":"Providers","title":"Hashing.providers","text":"Supported providers, represented as a tuple of submodules.\n\nCurrently, Hashing.providers == (Hashing.OpenSSL, Hashing.Libgcrypt).\n\n\n\n\n\n","category":"constant"},{"location":"providers/#Default","page":"Providers","title":"Default","text":"","category":"section"},{"location":"providers/","page":"Providers","title":"Providers","text":"Hashing.default_provider","category":"page"},{"location":"providers/#Hashing.default_provider","page":"Providers","title":"Hashing.default_provider","text":"Default provider, represented as a submodule.\n\nCurrently, Hashing.default_provider == Hashing.OpenSSL.\n\n\n\n\n\n","category":"module"},{"location":"#Hashing.jl","page":"Home","title":"Hashing.jl","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Fast cryptographic hash functions for Julia.","category":"page"},{"location":"","page":"Home","title":"Home","text":"This package makes available fast implementations of many cryptographic hash functions for use in Julia. Its high-level interface is designed to match the one of Julia's standard library package SHA. In particular, Hashing.jl can be used as a replacement for SHA.jl where performance is relevant.","category":"page"},{"location":"#Algorithms","page":"Home","title":"Algorithms","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"The supported hash functions and extendable-output functions (XOF) include:","category":"page"},{"location":"","page":"Home","title":"Home","text":"SHA-1\nSHA-2 family\nSHA-3 family\nMD4\nMD5\nRIPEMD-160\nBLAKE2 family\nGOST family\nSM3\nSTRIBOG family\nTIGER family\nWHIRLPOOL","category":"page"},{"location":"#Providers","page":"Home","title":"Providers","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"The algorithms are provided by binding to the following cryptographic libraries:","category":"page"},{"location":"","page":"Home","title":"Home","text":"OpenSSL based on OpenSSL_jll.jl\nLibgcrypt based on Libgcrypt_jll.jl","category":"page"},{"location":"api_high/#High-Level-Interface","page":"High-Level Interface","title":"High-Level Interface","text":"","category":"section"},{"location":"api_high/","page":"High-Level Interface","title":"High-Level Interface","text":"CollapsedDocStrings = true","category":"page"},{"location":"api_high/#Hash-Functions","page":"High-Level Interface","title":"Hash Functions","text":"","category":"section"},{"location":"api_high/","page":"High-Level Interface","title":"High-Level Interface","text":"Modules = [Hashing]\nFilter = t -> t in Hashing.functions.hash","category":"page"},{"location":"api_high/#Hashing.blake2b_160-Tuple{Any}","page":"High-Level Interface","title":"Hashing.blake2b_160","text":"blake2b_160(data[; provider, kwargs...])\n\nReturn the digest of data computed with the BLAKE2B_160 algorithm.\n\n\n\n\n\n","category":"method"},{"location":"api_high/#Hashing.blake2b_256-Tuple{Any}","page":"High-Level Interface","title":"Hashing.blake2b_256","text":"blake2b_256(data[; provider, kwargs...])\n\nReturn the digest of data computed with the BLAKE2B_256 algorithm.\n\n\n\n\n\n","category":"method"},{"location":"api_high/#Hashing.blake2b_384-Tuple{Any}","page":"High-Level Interface","title":"Hashing.blake2b_384","text":"blake2b_384(data[; provider, kwargs...])\n\nReturn the digest of data computed with the BLAKE2B_384 algorithm.\n\n\n\n\n\n","category":"method"},{"location":"api_high/#Hashing.blake2b_512-Tuple{Any}","page":"High-Level Interface","title":"Hashing.blake2b_512","text":"blake2b_512(data[; provider, kwargs...])\n\nReturn the digest of data computed with the BLAKE2B_512 algorithm.\n\n\n\n\n\n","category":"method"},{"location":"api_high/#Hashing.blake2s_128-Tuple{Any}","page":"High-Level Interface","title":"Hashing.blake2s_128","text":"blake2s_128(data[; provider, kwargs...])\n\nReturn the digest of data computed with the BLAKE2S_128 algorithm.\n\n\n\n\n\n","category":"method"},{"location":"api_high/#Hashing.blake2s_160-Tuple{Any}","page":"High-Level Interface","title":"Hashing.blake2s_160","text":"blake2s_160(data[; provider, kwargs...])\n\nReturn the digest of data computed with the BLAKE2S_160 algorithm.\n\n\n\n\n\n","category":"method"},{"location":"api_high/#Hashing.blake2s_224-Tuple{Any}","page":"High-Level Interface","title":"Hashing.blake2s_224","text":"blake2s_224(data[; provider, kwargs...])\n\nReturn the digest of data computed with the BLAKE2S_224 algorithm.\n\n\n\n\n\n","category":"method"},{"location":"api_high/#Hashing.blake2s_256-Tuple{Any}","page":"High-Level Interface","title":"Hashing.blake2s_256","text":"blake2s_256(data[; provider, kwargs...])\n\nReturn the digest of data computed with the BLAKE2S_256 algorithm.\n\n\n\n\n\n","category":"method"},{"location":"api_high/#Hashing.gost94-Tuple{Any}","page":"High-Level Interface","title":"Hashing.gost94","text":"gost94(data[; provider, kwargs...])\n\nReturn the digest of data computed with the GOST94 algorithm.\n\n\n\n\n\n","category":"method"},{"location":"api_high/#Hashing.gost94cp-Tuple{Any}","page":"High-Level Interface","title":"Hashing.gost94cp","text":"gost94cp(data[; provider, kwargs...])\n\nReturn the digest of data computed with the GOST94CP algorithm.\n\n\n\n\n\n","category":"method"},{"location":"api_high/#Hashing.md4-Tuple{Any}","page":"High-Level Interface","title":"Hashing.md4","text":"md4(data[; provider, kwargs...])\n\nReturn the digest of data computed with the MD4 algorithm.\n\n\n\n\n\n","category":"method"},{"location":"api_high/#Hashing.md5-Tuple{Any}","page":"High-Level Interface","title":"Hashing.md5","text":"md5(data[; provider, kwargs...])\n\nReturn the digest of data computed with the MD5 algorithm.\n\n\n\n\n\n","category":"method"},{"location":"api_high/#Hashing.ripemd160-Tuple{Any}","page":"High-Level Interface","title":"Hashing.ripemd160","text":"ripemd160(data[; provider, kwargs...])\n\nReturn the digest of data computed with the RIPEMD160 algorithm.\n\n\n\n\n\n","category":"method"},{"location":"api_high/#Hashing.sha1-Tuple{Any}","page":"High-Level Interface","title":"Hashing.sha1","text":"sha1(data[; provider, kwargs...])\n\nReturn the digest of data computed with the SHA1 algorithm.\n\n\n\n\n\n","category":"method"},{"location":"api_high/#Hashing.sha224-Tuple{Any}","page":"High-Level Interface","title":"Hashing.sha224","text":"sha224(data[; provider, kwargs...])\n\nReturn the digest of data computed with the SHA224 algorithm.\n\n\n\n\n\n","category":"method"},{"location":"api_high/#Hashing.sha256-Tuple{Any}","page":"High-Level Interface","title":"Hashing.sha256","text":"sha256(data[; provider, kwargs...])\n\nReturn the digest of data computed with the SHA256 algorithm.\n\n\n\n\n\n","category":"method"},{"location":"api_high/#Hashing.sha384-Tuple{Any}","page":"High-Level Interface","title":"Hashing.sha384","text":"sha384(data[; provider, kwargs...])\n\nReturn the digest of data computed with the SHA384 algorithm.\n\n\n\n\n\n","category":"method"},{"location":"api_high/#Hashing.sha3_224-Tuple{Any}","page":"High-Level Interface","title":"Hashing.sha3_224","text":"sha3_224(data[; provider, kwargs...])\n\nReturn the digest of data computed with the SHA3_224 algorithm.\n\n\n\n\n\n","category":"method"},{"location":"api_high/#Hashing.sha3_256-Tuple{Any}","page":"High-Level Interface","title":"Hashing.sha3_256","text":"sha3_256(data[; provider, kwargs...])\n\nReturn the digest of data computed with the SHA3_256 algorithm.\n\n\n\n\n\n","category":"method"},{"location":"api_high/#Hashing.sha3_384-Tuple{Any}","page":"High-Level Interface","title":"Hashing.sha3_384","text":"sha3_384(data[; provider, kwargs...])\n\nReturn the digest of data computed with the SHA3_384 algorithm.\n\n\n\n\n\n","category":"method"},{"location":"api_high/#Hashing.sha3_512-Tuple{Any}","page":"High-Level Interface","title":"Hashing.sha3_512","text":"sha3_512(data[; provider, kwargs...])\n\nReturn the digest of data computed with the SHA3_512 algorithm.\n\n\n\n\n\n","category":"method"},{"location":"api_high/#Hashing.sha512-Tuple{Any}","page":"High-Level Interface","title":"Hashing.sha512","text":"sha512(data[; provider, kwargs...])\n\nReturn the digest of data computed with the SHA512 algorithm.\n\n\n\n\n\n","category":"method"},{"location":"api_high/#Hashing.sha512_224-Tuple{Any}","page":"High-Level Interface","title":"Hashing.sha512_224","text":"sha512_224(data[; provider, kwargs...])\n\nReturn the digest of data computed with the SHA512_224 algorithm.\n\n\n\n\n\n","category":"method"},{"location":"api_high/#Hashing.sha512_256-Tuple{Any}","page":"High-Level Interface","title":"Hashing.sha512_256","text":"sha512_256(data[; provider, kwargs...])\n\nReturn the digest of data computed with the SHA512_256 algorithm.\n\n\n\n\n\n","category":"method"},{"location":"api_high/#Hashing.sm3-Tuple{Any}","page":"High-Level Interface","title":"Hashing.sm3","text":"sm3(data[; provider, kwargs...])\n\nReturn the digest of data computed with the SM3 algorithm.\n\n\n\n\n\n","category":"method"},{"location":"api_high/#Hashing.stribog256-Tuple{Any}","page":"High-Level Interface","title":"Hashing.stribog256","text":"stribog256(data[; provider, kwargs...])\n\nReturn the digest of data computed with the STRIBOG256 algorithm.\n\n\n\n\n\n","category":"method"},{"location":"api_high/#Hashing.stribog512-Tuple{Any}","page":"High-Level Interface","title":"Hashing.stribog512","text":"stribog512(data[; provider, kwargs...])\n\nReturn the digest of data computed with the STRIBOG512 algorithm.\n\n\n\n\n\n","category":"method"},{"location":"api_high/#Hashing.tiger-Tuple{Any}","page":"High-Level Interface","title":"Hashing.tiger","text":"tiger(data[; provider, kwargs...])\n\nReturn the digest of data computed with the TIGER algorithm.\n\n\n\n\n\n","category":"method"},{"location":"api_high/#Hashing.tiger1-Tuple{Any}","page":"High-Level Interface","title":"Hashing.tiger1","text":"tiger1(data[; provider, kwargs...])\n\nReturn the digest of data computed with the TIGER1 algorithm.\n\n\n\n\n\n","category":"method"},{"location":"api_high/#Hashing.tiger2-Tuple{Any}","page":"High-Level Interface","title":"Hashing.tiger2","text":"tiger2(data[; provider, kwargs...])\n\nReturn the digest of data computed with the TIGER2 algorithm.\n\n\n\n\n\n","category":"method"},{"location":"api_high/#Hashing.whirlpool-Tuple{Any}","page":"High-Level Interface","title":"Hashing.whirlpool","text":"whirlpool(data[; provider, kwargs...])\n\nReturn the digest of data computed with the WHIRLPOOL algorithm.\n\n\n\n\n\n","category":"method"},{"location":"api_high/#HMAC-Functions","page":"High-Level Interface","title":"HMAC Functions","text":"","category":"section"},{"location":"api_high/","page":"High-Level Interface","title":"High-Level Interface","text":"Modules = [Hashing]\nFilter = t -> t in Hashing.functions.hmac","category":"page"},{"location":"api_high/#Hashing.hmac_blake2b_160-Tuple{Any, Any}","page":"High-Level Interface","title":"Hashing.hmac_blake2b_160","text":"hmac_blake2b_160(key, data[; provider, kwargs...])\n\nReturn the HMAC of data keyed with key computed with the BLAKE2B_160 algorithm.\n\n\n\n\n\n","category":"method"},{"location":"api_high/#Hashing.hmac_blake2b_256-Tuple{Any, Any}","page":"High-Level Interface","title":"Hashing.hmac_blake2b_256","text":"hmac_blake2b_256(key, data[; provider, kwargs...])\n\nReturn the HMAC of data keyed with key computed with the BLAKE2B_256 algorithm.\n\n\n\n\n\n","category":"method"},{"location":"api_high/#Hashing.hmac_blake2b_384-Tuple{Any, Any}","page":"High-Level Interface","title":"Hashing.hmac_blake2b_384","text":"hmac_blake2b_384(key, data[; provider, kwargs...])\n\nReturn the HMAC of data keyed with key computed with the BLAKE2B_384 algorithm.\n\n\n\n\n\n","category":"method"},{"location":"api_high/#Hashing.hmac_blake2b_512-Tuple{Any, Any}","page":"High-Level Interface","title":"Hashing.hmac_blake2b_512","text":"hmac_blake2b_512(key, data[; provider, kwargs...])\n\nReturn the HMAC of data keyed with key computed with the BLAKE2B_512 algorithm.\n\n\n\n\n\n","category":"method"},{"location":"api_high/#Hashing.hmac_blake2s_128-Tuple{Any, Any}","page":"High-Level Interface","title":"Hashing.hmac_blake2s_128","text":"hmac_blake2s_128(key, data[; provider, kwargs...])\n\nReturn the HMAC of data keyed with key computed with the BLAKE2S_128 algorithm.\n\n\n\n\n\n","category":"method"},{"location":"api_high/#Hashing.hmac_blake2s_160-Tuple{Any, Any}","page":"High-Level Interface","title":"Hashing.hmac_blake2s_160","text":"hmac_blake2s_160(key, data[; provider, kwargs...])\n\nReturn the HMAC of data keyed with key computed with the BLAKE2S_160 algorithm.\n\n\n\n\n\n","category":"method"},{"location":"api_high/#Hashing.hmac_blake2s_224-Tuple{Any, Any}","page":"High-Level Interface","title":"Hashing.hmac_blake2s_224","text":"hmac_blake2s_224(key, data[; provider, kwargs...])\n\nReturn the HMAC of data keyed with key computed with the BLAKE2S_224 algorithm.\n\n\n\n\n\n","category":"method"},{"location":"api_high/#Hashing.hmac_blake2s_256-Tuple{Any, Any}","page":"High-Level Interface","title":"Hashing.hmac_blake2s_256","text":"hmac_blake2s_256(key, data[; provider, kwargs...])\n\nReturn the HMAC of data keyed with key computed with the BLAKE2S_256 algorithm.\n\n\n\n\n\n","category":"method"},{"location":"api_high/#Hashing.hmac_gost94-Tuple{Any, Any}","page":"High-Level Interface","title":"Hashing.hmac_gost94","text":"hmac_gost94(key, data[; provider, kwargs...])\n\nReturn the HMAC of data keyed with key computed with the GOST94 algorithm.\n\n\n\n\n\n","category":"method"},{"location":"api_high/#Hashing.hmac_gost94cp-Tuple{Any, Any}","page":"High-Level Interface","title":"Hashing.hmac_gost94cp","text":"hmac_gost94cp(key, data[; provider, kwargs...])\n\nReturn the HMAC of data keyed with key computed with the GOST94CP algorithm.\n\n\n\n\n\n","category":"method"},{"location":"api_high/#Hashing.hmac_md4-Tuple{Any, Any}","page":"High-Level Interface","title":"Hashing.hmac_md4","text":"hmac_md4(key, data[; provider, kwargs...])\n\nReturn the HMAC of data keyed with key computed with the MD4 algorithm.\n\n\n\n\n\n","category":"method"},{"location":"api_high/#Hashing.hmac_md5-Tuple{Any, Any}","page":"High-Level Interface","title":"Hashing.hmac_md5","text":"hmac_md5(key, data[; provider, kwargs...])\n\nReturn the HMAC of data keyed with key computed with the MD5 algorithm.\n\n\n\n\n\n","category":"method"},{"location":"api_high/#Hashing.hmac_ripemd160-Tuple{Any, Any}","page":"High-Level Interface","title":"Hashing.hmac_ripemd160","text":"hmac_ripemd160(key, data[; provider, kwargs...])\n\nReturn the HMAC of data keyed with key computed with the RIPEMD160 algorithm.\n\n\n\n\n\n","category":"method"},{"location":"api_high/#Hashing.hmac_sha1-Tuple{Any, Any}","page":"High-Level Interface","title":"Hashing.hmac_sha1","text":"hmac_sha1(key, data[; provider, kwargs...])\n\nReturn the HMAC of data keyed with key computed with the SHA1 algorithm.\n\n\n\n\n\n","category":"method"},{"location":"api_high/#Hashing.hmac_sha224-Tuple{Any, Any}","page":"High-Level Interface","title":"Hashing.hmac_sha224","text":"hmac_sha224(key, data[; provider, kwargs...])\n\nReturn the HMAC of data keyed with key computed with the SHA224 algorithm.\n\n\n\n\n\n","category":"method"},{"location":"api_high/#Hashing.hmac_sha256-Tuple{Any, Any}","page":"High-Level Interface","title":"Hashing.hmac_sha256","text":"hmac_sha256(key, data[; provider, kwargs...])\n\nReturn the HMAC of data keyed with key computed with the SHA256 algorithm.\n\n\n\n\n\n","category":"method"},{"location":"api_high/#Hashing.hmac_sha384-Tuple{Any, Any}","page":"High-Level Interface","title":"Hashing.hmac_sha384","text":"hmac_sha384(key, data[; provider, kwargs...])\n\nReturn the HMAC of data keyed with key computed with the SHA384 algorithm.\n\n\n\n\n\n","category":"method"},{"location":"api_high/#Hashing.hmac_sha3_224-Tuple{Any, Any}","page":"High-Level Interface","title":"Hashing.hmac_sha3_224","text":"hmac_sha3_224(key, data[; provider, kwargs...])\n\nReturn the HMAC of data keyed with key computed with the SHA3_224 algorithm.\n\n\n\n\n\n","category":"method"},{"location":"api_high/#Hashing.hmac_sha3_256-Tuple{Any, Any}","page":"High-Level Interface","title":"Hashing.hmac_sha3_256","text":"hmac_sha3_256(key, data[; provider, kwargs...])\n\nReturn the HMAC of data keyed with key computed with the SHA3_256 algorithm.\n\n\n\n\n\n","category":"method"},{"location":"api_high/#Hashing.hmac_sha3_384-Tuple{Any, Any}","page":"High-Level Interface","title":"Hashing.hmac_sha3_384","text":"hmac_sha3_384(key, data[; provider, kwargs...])\n\nReturn the HMAC of data keyed with key computed with the SHA3_384 algorithm.\n\n\n\n\n\n","category":"method"},{"location":"api_high/#Hashing.hmac_sha3_512-Tuple{Any, Any}","page":"High-Level Interface","title":"Hashing.hmac_sha3_512","text":"hmac_sha3_512(key, data[; provider, kwargs...])\n\nReturn the HMAC of data keyed with key computed with the SHA3_512 algorithm.\n\n\n\n\n\n","category":"method"},{"location":"api_high/#Hashing.hmac_sha512-Tuple{Any, Any}","page":"High-Level Interface","title":"Hashing.hmac_sha512","text":"hmac_sha512(key, data[; provider, kwargs...])\n\nReturn the HMAC of data keyed with key computed with the SHA512 algorithm.\n\n\n\n\n\n","category":"method"},{"location":"api_high/#Hashing.hmac_sha512_224-Tuple{Any, Any}","page":"High-Level Interface","title":"Hashing.hmac_sha512_224","text":"hmac_sha512_224(key, data[; provider, kwargs...])\n\nReturn the HMAC of data keyed with key computed with the SHA512_224 algorithm.\n\n\n\n\n\n","category":"method"},{"location":"api_high/#Hashing.hmac_sha512_256-Tuple{Any, Any}","page":"High-Level Interface","title":"Hashing.hmac_sha512_256","text":"hmac_sha512_256(key, data[; provider, kwargs...])\n\nReturn the HMAC of data keyed with key computed with the SHA512_256 algorithm.\n\n\n\n\n\n","category":"method"},{"location":"api_high/#Hashing.hmac_sm3-Tuple{Any, Any}","page":"High-Level Interface","title":"Hashing.hmac_sm3","text":"hmac_sm3(key, data[; provider, kwargs...])\n\nReturn the HMAC of data keyed with key computed with the SM3 algorithm.\n\n\n\n\n\n","category":"method"},{"location":"api_high/#Hashing.hmac_stribog256-Tuple{Any, Any}","page":"High-Level Interface","title":"Hashing.hmac_stribog256","text":"hmac_stribog256(key, data[; provider, kwargs...])\n\nReturn the HMAC of data keyed with key computed with the STRIBOG256 algorithm.\n\n\n\n\n\n","category":"method"},{"location":"api_high/#Hashing.hmac_stribog512-Tuple{Any, Any}","page":"High-Level Interface","title":"Hashing.hmac_stribog512","text":"hmac_stribog512(key, data[; provider, kwargs...])\n\nReturn the HMAC of data keyed with key computed with the STRIBOG512 algorithm.\n\n\n\n\n\n","category":"method"},{"location":"api_high/#Hashing.hmac_tiger-Tuple{Any, Any}","page":"High-Level Interface","title":"Hashing.hmac_tiger","text":"hmac_tiger(key, data[; provider, kwargs...])\n\nReturn the HMAC of data keyed with key computed with the TIGER algorithm.\n\n\n\n\n\n","category":"method"},{"location":"api_high/#Hashing.hmac_tiger1-Tuple{Any, Any}","page":"High-Level Interface","title":"Hashing.hmac_tiger1","text":"hmac_tiger1(key, data[; provider, kwargs...])\n\nReturn the HMAC of data keyed with key computed with the TIGER1 algorithm.\n\n\n\n\n\n","category":"method"},{"location":"api_high/#Hashing.hmac_tiger2-Tuple{Any, Any}","page":"High-Level Interface","title":"Hashing.hmac_tiger2","text":"hmac_tiger2(key, data[; provider, kwargs...])\n\nReturn the HMAC of data keyed with key computed with the TIGER2 algorithm.\n\n\n\n\n\n","category":"method"},{"location":"api_high/#Hashing.hmac_whirlpool-Tuple{Any, Any}","page":"High-Level Interface","title":"Hashing.hmac_whirlpool","text":"hmac_whirlpool(key, data[; provider, kwargs...])\n\nReturn the HMAC of data keyed with key computed with the WHIRLPOOL algorithm.\n\n\n\n\n\n","category":"method"},{"location":"api_high/#XOF-Functions","page":"High-Level Interface","title":"XOF Functions","text":"","category":"section"},{"location":"api_high/","page":"High-Level Interface","title":"High-Level Interface","text":"Modules = [Hashing]\nFilter = t -> t in Hashing.functions.xof","category":"page"},{"location":"api_high/#Hashing.shake128-Tuple{Any, Any}","page":"High-Level Interface","title":"Hashing.shake128","text":"shake128(data, len[; provider, kwargs...])\n\nReturn the first len bytes of the digest of data computed with the SHAKE128 algorithm.\n\n\n\n\n\n","category":"method"},{"location":"api_high/#Hashing.shake128-Tuple{Any}","page":"High-Level Interface","title":"Hashing.shake128","text":"shake128(data[; provider, kwargs...])\n\nReturn a hash context initialized with data for the SHAKE128 algorithm.\n\n\n\n\n\n","category":"method"},{"location":"api_high/#Hashing.shake256-Tuple{Any, Any}","page":"High-Level Interface","title":"Hashing.shake256","text":"shake256(data, len[; provider, kwargs...])\n\nReturn the first len bytes of the digest of data computed with the SHAKE256 algorithm.\n\n\n\n\n\n","category":"method"},{"location":"api_high/#Hashing.shake256-Tuple{Any}","page":"High-Level Interface","title":"Hashing.shake256","text":"shake256(data[; provider, kwargs...])\n\nReturn a hash context initialized with data for the SHAKE256 algorithm.\n\n\n\n\n\n","category":"method"},{"location":"algorithms/#Algorithms","page":"Algorithms","title":"Algorithms","text":"","category":"section"},{"location":"algorithms/","page":"Algorithms","title":"Algorithms","text":"CollapsedDocStrings = true","category":"page"},{"location":"algorithms/#Hash-Algorithms","page":"Algorithms","title":"Hash Algorithms","text":"","category":"section"},{"location":"algorithms/","page":"Algorithms","title":"Algorithms","text":"Modules = [Hashing]\nFilter = t -> t isa Hashing.HashAlgorithmID","category":"page"},{"location":"algorithms/#Hashing.BLAKE2B_160","page":"Algorithms","title":"Hashing.BLAKE2B_160","text":"Identifier for the BLAKE2B_160 algorithm.\n\n\n\n\n\n","category":"constant"},{"location":"algorithms/#Hashing.BLAKE2B_256","page":"Algorithms","title":"Hashing.BLAKE2B_256","text":"Identifier for the BLAKE2B_256 algorithm.\n\n\n\n\n\n","category":"constant"},{"location":"algorithms/#Hashing.BLAKE2B_384","page":"Algorithms","title":"Hashing.BLAKE2B_384","text":"Identifier for the BLAKE2B_384 algorithm.\n\n\n\n\n\n","category":"constant"},{"location":"algorithms/#Hashing.BLAKE2B_512","page":"Algorithms","title":"Hashing.BLAKE2B_512","text":"Identifier for the BLAKE2B_512 algorithm.\n\n\n\n\n\n","category":"constant"},{"location":"algorithms/#Hashing.BLAKE2S_128","page":"Algorithms","title":"Hashing.BLAKE2S_128","text":"Identifier for the BLAKE2S_128 algorithm.\n\n\n\n\n\n","category":"constant"},{"location":"algorithms/#Hashing.BLAKE2S_160","page":"Algorithms","title":"Hashing.BLAKE2S_160","text":"Identifier for the BLAKE2S_160 algorithm.\n\n\n\n\n\n","category":"constant"},{"location":"algorithms/#Hashing.BLAKE2S_224","page":"Algorithms","title":"Hashing.BLAKE2S_224","text":"Identifier for the BLAKE2S_224 algorithm.\n\n\n\n\n\n","category":"constant"},{"location":"algorithms/#Hashing.BLAKE2S_256","page":"Algorithms","title":"Hashing.BLAKE2S_256","text":"Identifier for the BLAKE2S_256 algorithm.\n\n\n\n\n\n","category":"constant"},{"location":"algorithms/#Hashing.GOST94","page":"Algorithms","title":"Hashing.GOST94","text":"Identifier for the GOST94 algorithm.\n\n\n\n\n\n","category":"constant"},{"location":"algorithms/#Hashing.GOST94CP","page":"Algorithms","title":"Hashing.GOST94CP","text":"Identifier for the GOST94CP algorithm.\n\n\n\n\n\n","category":"constant"},{"location":"algorithms/#Hashing.MD4","page":"Algorithms","title":"Hashing.MD4","text":"Identifier for the MD4 algorithm.\n\n\n\n\n\n","category":"constant"},{"location":"algorithms/#Hashing.MD5","page":"Algorithms","title":"Hashing.MD5","text":"Identifier for the MD5 algorithm.\n\n\n\n\n\n","category":"constant"},{"location":"algorithms/#Hashing.RIPEMD160","page":"Algorithms","title":"Hashing.RIPEMD160","text":"Identifier for the RIPEMD160 algorithm.\n\n\n\n\n\n","category":"constant"},{"location":"algorithms/#Hashing.SHA1","page":"Algorithms","title":"Hashing.SHA1","text":"Identifier for the SHA1 algorithm.\n\n\n\n\n\n","category":"constant"},{"location":"algorithms/#Hashing.SHA224","page":"Algorithms","title":"Hashing.SHA224","text":"Identifier for the SHA224 algorithm.\n\n\n\n\n\n","category":"constant"},{"location":"algorithms/#Hashing.SHA256","page":"Algorithms","title":"Hashing.SHA256","text":"Identifier for the SHA256 algorithm.\n\n\n\n\n\n","category":"constant"},{"location":"algorithms/#Hashing.SHA384","page":"Algorithms","title":"Hashing.SHA384","text":"Identifier for the SHA384 algorithm.\n\n\n\n\n\n","category":"constant"},{"location":"algorithms/#Hashing.SHA3_224","page":"Algorithms","title":"Hashing.SHA3_224","text":"Identifier for the SHA3_224 algorithm.\n\n\n\n\n\n","category":"constant"},{"location":"algorithms/#Hashing.SHA3_256","page":"Algorithms","title":"Hashing.SHA3_256","text":"Identifier for the SHA3_256 algorithm.\n\n\n\n\n\n","category":"constant"},{"location":"algorithms/#Hashing.SHA3_384","page":"Algorithms","title":"Hashing.SHA3_384","text":"Identifier for the SHA3_384 algorithm.\n\n\n\n\n\n","category":"constant"},{"location":"algorithms/#Hashing.SHA3_512","page":"Algorithms","title":"Hashing.SHA3_512","text":"Identifier for the SHA3_512 algorithm.\n\n\n\n\n\n","category":"constant"},{"location":"algorithms/#Hashing.SHA512","page":"Algorithms","title":"Hashing.SHA512","text":"Identifier for the SHA512 algorithm.\n\n\n\n\n\n","category":"constant"},{"location":"algorithms/#Hashing.SHA512_224","page":"Algorithms","title":"Hashing.SHA512_224","text":"Identifier for the SHA512_224 algorithm.\n\n\n\n\n\n","category":"constant"},{"location":"algorithms/#Hashing.SHA512_256","page":"Algorithms","title":"Hashing.SHA512_256","text":"Identifier for the SHA512_256 algorithm.\n\n\n\n\n\n","category":"constant"},{"location":"algorithms/#Hashing.SM3","page":"Algorithms","title":"Hashing.SM3","text":"Identifier for the SM3 algorithm.\n\n\n\n\n\n","category":"constant"},{"location":"algorithms/#Hashing.STRIBOG256","page":"Algorithms","title":"Hashing.STRIBOG256","text":"Identifier for the STRIBOG256 algorithm.\n\n\n\n\n\n","category":"constant"},{"location":"algorithms/#Hashing.STRIBOG512","page":"Algorithms","title":"Hashing.STRIBOG512","text":"Identifier for the STRIBOG512 algorithm.\n\n\n\n\n\n","category":"constant"},{"location":"algorithms/#Hashing.TIGER","page":"Algorithms","title":"Hashing.TIGER","text":"Identifier for the TIGER algorithm.\n\n\n\n\n\n","category":"constant"},{"location":"algorithms/#Hashing.TIGER1","page":"Algorithms","title":"Hashing.TIGER1","text":"Identifier for the TIGER1 algorithm.\n\n\n\n\n\n","category":"constant"},{"location":"algorithms/#Hashing.TIGER2","page":"Algorithms","title":"Hashing.TIGER2","text":"Identifier for the TIGER2 algorithm.\n\n\n\n\n\n","category":"constant"},{"location":"algorithms/#Hashing.WHIRLPOOL","page":"Algorithms","title":"Hashing.WHIRLPOOL","text":"Identifier for the WHIRLPOOL algorithm.\n\n\n\n\n\n","category":"constant"},{"location":"algorithms/#XOF-Algorithms","page":"Algorithms","title":"XOF Algorithms","text":"","category":"section"},{"location":"algorithms/","page":"Algorithms","title":"Algorithms","text":"Modules = [Hashing]\nFilter = t -> t isa Hashing.XOFAlgorithmID","category":"page"},{"location":"algorithms/#Hashing.SHAKE128","page":"Algorithms","title":"Hashing.SHAKE128","text":"Identifier for the SHAKE128 algorithm.\n\n\n\n\n\n","category":"constant"},{"location":"algorithms/#Hashing.SHAKE256","page":"Algorithms","title":"Hashing.SHAKE256","text":"Identifier for the SHAKE256 algorithm.\n\n\n\n\n\n","category":"constant"}]
}