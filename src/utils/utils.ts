//client下所有键值必须是布尔值
export const client = {
  /**
   * 是否为mobile
   */
  mobile:
    typeof navigator !== 'undefined' &&
    /(Android|iPhone|SymbianOS|Windows\ Phone|iPad|iPod)/i.test(
      navigator.userAgent
    ),
  /**
   * 是否为ios
   */
  ios:
    typeof navigator !== 'undefined' &&
    /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent),
  /**
   * 是否为android
   */
  android:
    typeof navigator !== 'undefined' && /(Android)/i.test(navigator.userAgent),
  /**
   * 是否为微信webview
   */
  weixinwebview:
    typeof navigator !== 'undefined' &&
    /MicroMessenger/i.test(navigator.userAgent),
};
