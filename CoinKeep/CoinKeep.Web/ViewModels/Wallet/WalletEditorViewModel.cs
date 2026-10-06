using System.ComponentModel.DataAnnotations;

namespace CoinKeep.Web.ViewModels.Wallet
{
    public class WalletEditorViewModel
    {
        /// <summary>
        /// 資金帳戶 ID
        /// </summary>
        public int? WalletId { get; set; }

        /// <summary>
        /// 資金帳戶名稱
        /// </summary>
        [Required(ErrorMessage = "請輸入帳戶名稱")]
        [MaxLength(50)]
        [Display(Name = "帳戶名稱")]
        public string WalletName { get; set; } = "";

        /// <summary>
        /// 資金帳戶類型
        /// </summary>
        [Required(ErrorMessage = "請選擇帳戶類型")]
        [Display(Name = "帳戶類型")]
        public string WalletType { get; set; } = "";

        /// <summary>
        /// 初始餘額
        /// </summary>
        [Range(typeof(decimal), "0", "9999999999999999.99", ErrorMessage = "初始餘額不可小於 0")]
        [Display(Name = "初始餘額")]
        public decimal InitialBalance { get; set; }
    }
}