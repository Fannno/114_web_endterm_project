using CoinKeep.Web.ViewModels.Account;

namespace CoinKeep.Web.BLL
{
    /// <summary>
    /// 使用者帳號商業邏輯介面
    /// </summary>
    public interface IAccountBLL
    {
        /// <summary>
        /// 註冊使用者
        /// </summary>
        /// <param name="registerVM">註冊資料</param>
        string Register(RegisterViewModel registerVM);
    }
}