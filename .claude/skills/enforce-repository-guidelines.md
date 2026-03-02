# enforce-repository-guidelines

## 使用场景
日常开发中检查规范执行、代码审查时验证规范

## 执行步骤

### Step 1: 检查目录结构
```bash
echo "=== 检查必需目录 ==="
for dir in docs/TODO.md docs/prds docs/guide docs/specs docs/decisions; do
  if [ -e "$dir" ]; then
    echo "✅ $dir 存在"
  else
    echo "❌ $dir 缺失"
  fi
done
```

### Step 2: 检查根目录文件
```bash
echo "=== 检查根文件 ==="
for file in README.md CHANGELOG.md LICENSE; do
  if [ -e "$file" ]; then
    echo "✅ $file 存在"
  else
    echo "❌ $file 缺失"
  fi
done
```

### Step 3: 检查代码目录结构
```bash
echo "=== 检查代码目录 ==="
for dir in blocks apps skills crates packages src; do
  if [ -d "$dir" ]; then
    echo "✅ $dir/ 存在"
  fi
done
```

### Step 4: 检查TODO.md格式
```bash
echo "=== 检查 TODO.md ==="
if [ -f "docs/TODO.md" ]; then
  if grep -q "P0\|P1\|P2\|P3" docs/TODO.md; then
    echo "✅ 包含优先级标记"
  else
    echo "⚠️  缺少优先级标记"
  fi
fi
```

## 输出报告

```
📋 项目规范检查报告
========================

✅ 通过项:
⚠️ 建议项:
❌ 缺失项:
```

## 完成后
报告检查结果，提供修复建议
