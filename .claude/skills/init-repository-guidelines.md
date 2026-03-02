# init-repository-guidelines

## 使用场景
新项目初始化或需要规范化项目结构时使用

## 执行步骤

### Step 1: 检查当前项目结构
```bash
ls -la
```

### Step 2: 创建必需的目录结构
```
docs/
├── TODO.md
├── prds/
├── guide/
├── specs/
├── whitepapers/
├── decisions/
└── archive/
```

### Step 3: 创建必需的根目录文件
- README.md
- CHANGELOG.md
- LICENSE

### Step 4: 验证结构
```bash
ls -la docs/
ls -la *.md
```

### Step 5: Git提交
```bash
git add .
git commit -m "docs: 初始化项目规范结构"
```

## 完成后
报告创建的目录和文件列表
