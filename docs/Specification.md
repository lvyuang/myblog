## 错误返回值规范

```json
{
    error: {
        code: {Number}, // 0表示没有错误
        name: {String},
        message: {String}
    }
}
```

## 正确无返回值规范

```json
{
    ok: true
}
```