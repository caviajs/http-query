<div align="center">
<h3>@caviajs/http-query</h3>
<p>a micro framework for node.js</p>
</div>

## Introduction

This package contains `HttpQuery` which can be used to parse query parameters.

## Usage

### Installation

```shell
npm install @caviajs/http-query --save
```

### Parsing

```typescript
import { HttpQuery } from '@caviajs/http-query';

router
  .route({
    handler: (request, response, next) => {
      const query = HttpQuery.parse(request);
      
      // query...
    },
    /* ... */
  });
```
