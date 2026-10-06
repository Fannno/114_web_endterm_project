using CoinKeep.Web.Models;

namespace CoinKeep.Web.DAL
{
    public interface IWalletDAL
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
        /// <param name="wallet">資金帳戶資料</param>
        void CreateWallet(Wallet wallet);
    }
}