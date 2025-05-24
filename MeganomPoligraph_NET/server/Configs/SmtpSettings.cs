namespace MeganomPoligraph.Configs
{
    public class SmtpSettings
    {
        public string Host { get; set; }
        public int Port { get; set; }
        public string SenderMail { get; set; }
        public string SenderPassword { get; set; }
        public string RecipientMail { get; set; }
    }
}
