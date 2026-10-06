using CoinKeep.Web.Models;
using CoinKeep.Web.ViewModels.Wallet;

namespace CoinKeep.Web.BLL
{
    public interface IWalletBLL
    {
        /// <summary>
        /// 取得使用者啟用中的資金帳戶
        /// </summary>
        /// <param name="userId">使用者 ID</param>
        /// <returns>資金帳戶清單</returns>
        List<Wallet> GetWalletsByUserId(int userId);

        /// <summary>
        /// 新增資金帳戶
        /// </summary>
        /// <param name="createVM">新增資金帳戶資料</param>
        /// <param name="userId">使用者 ID</param>
        /// <returns>新增結果訊息，成功則回傳空字串</returns>
        string CreateWallet(WalletEditorViewModel createVM, int userId);
    }
}