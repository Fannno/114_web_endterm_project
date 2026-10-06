using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace CoinKeep.Web.Models
{
    /// <summary>
    /// 使用者資金帳戶資料
    /// </summary>
    public class Wallet
    {
        /// <summary>
        /// 資金帳戶 ID
        /// </summary>
        [DisplayName("資金帳戶 ID")]
        public int WalletId { get; set; }

        /// <summary>
        /// 使用者 ID
        /// </summary>
        [DisplayName("使用者 ID")]
        public int UserId { get; set; }

        /// <summary>
        /// 資金帳戶名稱
        /// </summary>
        [Required]
        [MaxLength(50)]
        [DisplayName("帳戶名稱")]
        public string WalletName { get; set; } = "";

        /// <summary>
        /// 資金帳戶類型
        /// </summary>
        [Required]
        [MaxLength(20)]
        [DisplayName("帳戶類型")]
        public string WalletType { get; set; } = "";

        /// <summary>
        /// 初始餘額
        /// </summary>
        [DisplayName("初始餘額")]
        public decimal InitialBalance { get; set; }

        /// <summary>
        /// 是否啟用
        /// </summary>
        [DisplayName("是否啟用")]
        public bool IsActive { get; set; }

        /// <summary>
        /// 建立時間
        /// </summary>
        [DisplayName("建立時間")]
        public DateTime CreatedAt { get; set; }
    }
}