export function toCamelCase(word: string): string {
    return word.replace(/-([a-z])/g, function (match: string, letter) {
        return letter.toUpperCase();
    });
}