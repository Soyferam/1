#!/bin/bash

echo "🚀 Building Frag Arena UI for Vercel..."

# Очищаем папку public
rm -rf public
mkdir -p public

# Копируем все необходимые файлы
echo "📁 Copying files to public directory..."
cp -r assets assets2 assets3 components js styles public/
cp *.html public/

# Создаем README для public
echo "📝 Creating public README..."
cat > public/README.md << EOF
# Public Directory

Эта папка содержит все статические файлы для деплоя на Vercel.

## Структура

- \`index.html\` - Главная страница
- \`friends.html\` - Страница друзей  
- \`withdraw.html\` - Страница вывода средств
- \`test.html\` - Тестовая страница
- \`assets/\` - Изображения и медиафайлы
- \`styles/\` - CSS стили
- \`js/\` - JavaScript файлы
- \`components/\` - HTML компоненты

## Деплой

Файлы в этой папке автоматически деплоятся на Vercel при push в main ветку.
EOF

echo "✅ Build completed! Files are ready in public directory."
echo "📊 Build summary:"
echo "   - HTML files: $(find public -name "*.html" | wc -l | tr -d ' ')"
echo "   - CSS files: $(find public -name "*.css" | wc -l | tr -d ' ')"
echo "   - JS files: $(find public -name "*.js" | wc -l | tr -d ' ')"
echo "   - Asset directories: $(find public -type d -name "assets*" | wc -l | tr -d ' ')"
echo ""
echo "🚀 Ready for Vercel deployment!"
