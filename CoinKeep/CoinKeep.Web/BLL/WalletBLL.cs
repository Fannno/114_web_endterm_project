using CoinKeep.Web.DAL;
using CoinKeep.Web.Models;
using CoinKeep.Web.ViewModels.Wallet;

namespace CoinKeep.Web.BLL
{
    public class WalletBLL : IWalletBLL
    {
        private readonly IWalletDAL walletDAL;
        public WalletBLL(IWalletDAL walletDAL) { this.walletDAL = walletDAL; }

        /// <summary>
        /// 取得使用者啟用中的資金帳戶
        /// </summary>
        /// <param name="userId">使用者 ID</param>
        /// <returns>資金帳戶清單</returns>
        public List<Wallet> GetWalletsByUserId(int userId)
        {
            return walletDAL.GetWalletsByUserId(userId);
        }

        /// <summary>
        /// 新增資金帳戶
        /// </summary>
        /// <param name="createVM">新增資金帳戶資料</param>
        /// <param name="userId">使用者 ID</param>
        /// <returns>新增結果訊息，成功則回傳空字串</returns>
        public string CreateWallet(WalletEditorViewModel createVM, int userId)
        {
            string[] walletTypes = { "Cash", "Bank", "EWallet" };
            if (!walletTypes.Contains(createVM.WalletType))
            {
                return "帳戶類型不正確";
            }

            Wallet wallet = new Wallet
            {
                UserId = userId,
                WalletName = createVM.WalletName,
                WalletType = createVM.WalletType,
                InitialBalance = createVM.InitialBalance
            };

            walletDAL.CreateWallet(wallet);
            return "";
        }
    }
}