# CryptographicHashFunctions.jl

*Fast cryptographic hash functions for Julia.*

[![License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat)](LICENSE)
[![Documentation (stable)](https://img.shields.io/badge/docs-stable-blue.svg)](https://erich-9.github.io/CryptographicHashFunctions.jl/stable)
[![Documentation (dev)](https://img.shields.io/badge/docs-dev-blue.svg)](https://erich-9.github.io/CryptographicHashFunctions.jl/dev)
[![Build Status](https://github.com/erich-9/CryptographicHashFunctions.jl/actions/workflows/CI.yml/badge.svg)](https://github.com/erich-9/CryptographicHashFunctions.jl/actions/workflows/CI.yml)
[![Aqua](https://raw.githubusercontent.com/JuliaTesting/Aqua.jl/master/badge.svg)](https://github.com/JuliaTesting/Aqua.jl)
[![Coverage](https://codecov.io/github/erich-9/CryptographicHashFunctions.jl/branch/main/graph/badge.svg)](https://codecov.io/github/erich-9/CryptographicHashFunctions.jl)

This package provides fast implementations of many [cryptographic hash functions](https://en.wikipedia.org/wiki/Cryptographic_hash_function) for use in Julia.
Its high-level interface is designed to match the one of Julia's standard library package [SHA](https://docs.julialang.org/en/v1/stdlib/SHA/).
In particular, it can effortlessly replace [SHA.jl](https://github.com/JuliaCrypto/SHA.jl) where performance is relevant.

## Algorithms

The supported hash functions and [extendable-output functions](https://en.wikipedia.org/wiki/Extendable-output_function) (XOF) include:

  - [SHA-1](https://en.wikipedia.org/wiki/SHA-1)
  - [SHA-2 family](https://en.wikipedia.org/wiki/SHA-2)
  - [SHA-3 family](https://en.wikipedia.org/wiki/SHA-3)
  - [MD2](https://en.wikipedia.org/wiki/MD2_(hash_function))
  - [MD4](https://en.wikipedia.org/wiki/MD4)
  - [MD5](https://en.wikipedia.org/wiki/MD5)
  - [RIPEMD-160](https://en.wikipedia.org/wiki/RIPEMD)
  - [BLAKE2 family](https://en.wikipedia.org/wiki/BLAKE_(hash_function)#BLAKE2)
  - [GOST family](https://en.wikipedia.org/wiki/GOST_(hash_function))
  - [SM3](https://en.wikipedia.org/wiki/SM3_(hash_function))
  - [STRIBOG family](https://en.wikipedia.org/wiki/Streebog)
  - [TIGER family](https://en.wikipedia.org/wiki/Tiger_(hash_function))
  - [WHIRLPOOL](https://en.wikipedia.org/wiki/Whirlpool_(hash_function))

## Providers

The algorithms are provided by binding to the following cryptographic libraries:

  - [OpenSSL](https://www.openssl.org/) via [OpenSSL_jll.jl](https://github.com/JuliaBinaryWrappers/OpenSSL_jll.jl)
  - [Libgcrypt](https://gnupg.org/software/libgcrypt/index.html) via [Libgcrypt_jll.jl](https://github.com/JuliaBinaryWrappers/Libgcrypt_jll.jl)
  - [Nettle](https://www.lysator.liu.se/%7Enisse/nettle/) via [Nettle_jll.jl](https://github.com/JuliaBinaryWrappers/Nettle_jll.jl)
  - [libsodium](https://doc.libsodium.org/) via [libsodium_jll.jl](https://github.com/JuliaBinaryWrappers/libsodium_jll.jl)
