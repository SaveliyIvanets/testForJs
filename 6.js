// Подключаю модуль fs для работы с файловой системой
const fs = require('fs');
const path = require('path');

// Константы с настройками
const FOLDER_PATH = './html_files'; // Путь к папке с HTML-файлами
const SEARCH_STRING = 'example';    // Подстрока для поиска в параграфах

// Главная функция модуля
async function analyzeHtmlFiles() {
    try {
        // 1. Получаю список HTML/HTM файлов в указанной папке
        const htmlFiles = await getHtmlFiles(FOLDER_PATH);

        // Если файлов не найдено - вывожу сообщение и завершаю работу
        if (htmlFiles.length === 0) {
            console.log('В указанной папке не найдено HTML-файлов.');
            return;
        }

        // 2. Анализируем каждый файл
        for (const file of htmlFiles) {
            const filePath = path.join(FOLDER_PATH, file);

            // Читаю содержимое файла
            const content = await readFileContent(filePath);

            // 3. Анализирую содержимое и получаю статистику
            const stats = analyzeHtmlContent(content, SEARCH_STRING);

            // 4. Вывожу результаты
            console.log(`Файл: ${file}`);
            console.log(`Всего параграфов: ${stats.totalParagraphs}`);
            console.log(`Параграфов содержащих "${SEARCH_STRING}": ${stats.matchingParagraphs}`);
            console.log('----------------------------------------');
        }
    } catch (error) {
        console.error('Произошла ошибка:', error.message);
    }
}

// Функция для получения списка HTML/HTM файлов в папке
function getHtmlFiles(folderPath) {
    return new Promise((resolve, reject) => {
        fs.readdir(folderPath, (err, files) => {
            if (err) {
                reject(err);
                return;
            }

            // Фильтруем только HTML/HTM файлы
            const htmlFiles = files.filter(file =>
                file.endsWith('.html') || file.endsWith('.htm')
            );

            resolve(htmlFiles);
        });
    });
}

// Функция для чтения содержимого файла
function readFileContent(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(data);
        });
    });
}

// Функция для анализа HTML-контента
function analyzeHtmlContent(content, searchString) {
    // Регулярное выражение для поиска параграфов
    const paragraphRegex = /<p[^>]*>.*?<\/p>/gis;
    const paragraphs = content.match(paragraphRegex) || [];

    // Считаю параграфы, содержащие искомую подстроку
    let matchingCount = 0;
    paragraphs.forEach(p => {
        if (p.toLowerCase().includes(searchString.toLowerCase())) {
            matchingCount++;
        }
    });

    return {
        totalParagraphs: paragraphs.length,
        matchingParagraphs: matchingCount
    };
}

// Запускаю анализ
analyzeHtmlFiles();

// P.S это задание показалось мне реально сложным и для решение его я не брезгал прибегать к помощи от интернета и ИИ