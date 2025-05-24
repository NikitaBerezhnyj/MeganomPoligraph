namespace MeganomPoligraph.Utils
{
    public static class MappedValue
    {
        public static string GetMappedValue(string? value, string dictionaryType = "")
        {
            var typeOptions = new Dictionary<string, string>
            {
                { "bag", "Пакет" },
                { "folder", "Тека" }
            };

            var materialOptions = new Dictionary<string, string>
            {
                { "paper", "Папір крейдований 200 г." },
                { "cardboard", "Картон 210 г." },
                { "kraft", "Крафт 110 г." }
            };

            var printOptions = new Dictionary<string, string>
            {
                { "pantone_1_0", "Pantone 1+0" },
                { "pantone_2_0", "Pantone 2+0" },
                { "pantone_3_0", "Pantone 3+0" },
                { "pantone_4_0", "Pantone 4+0" }
            };

            var embossingOptions = new Dictionary<string, string>
            {
                { "matte", "Матова" },
                { "glossy", "Глянцева" },
                { "none", "Без ламінації" }
            };

            var handlesOptions = new Dictionary<string, string>
            {
                { "cord", "Шнур" },
                { "ribbon_satin", "Стрічка атласна" },
                { "ribbon_reps", "Стрічка репсова" },
                { "none", "Без ручок" }
            };

            Dictionary<string, string> selectedMap = dictionaryType switch
            {
                "type" => typeOptions,
                "material" => materialOptions,
                "print" => printOptions,
                "embossing" => embossingOptions,
                "handles" => handlesOptions,
                _ => new Dictionary<string, string>()
            };

            return value switch
            {
                "custom" => "Власний варіант замовника",
                "" => "Не обрано",
                null => "Не вказано",
                _ => selectedMap.ContainsKey(value) ? selectedMap[value] : value
            };
        }
    }
}
