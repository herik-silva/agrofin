abstract class FormatService {
    public static toLocaleDate(date: Date, locale: string): string {
        return date.toLocaleDateString(locale);
    }
}

export default FormatService;