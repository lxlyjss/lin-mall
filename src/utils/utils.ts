//client下所有键值必须是布尔值
export const client = {
  /**
   * 是否为mobile
   */
  mobile:
    typeof navigator !== "undefined" &&
    /(Android|iPhone|SymbianOS|Windows\ Phone|iPad|iPod)/i.test(
      navigator.userAgent
    ),
  /**
   * 是否为ios
   */
  ios:
    typeof navigator !== "undefined" &&
    /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent),
  /**
   * 是否为android
   */
  android:
    typeof navigator !== "undefined" && /(Android)/i.test(navigator.userAgent),
  /**
   * 是否为微信webview
   */
  weixinwebview:
    typeof navigator !== "undefined" &&
    /MicroMessenger/i.test(navigator.userAgent),
};

/**
 * 防抖函数
 * @param fn 触发函数
 * @param delay 延迟执行时长
 */
export const debounce = function(fn: Function, delay: number) {
  let timeout: any;
  return function() {
    clearTimeout(timeout) // 如果持续触发，那么就清除定时器，定时器的回调就不会执行。
    timeout = setTimeout(() => {
      // @ts-ignore
      fn.apply(this, arguments)
    }, delay)
  }
};
/**
 * 节流函数
 * @param fn 触发函数 
 * @param delay 等待时间
 */
export const throttle = function(fn: Function, delay: number) {
  let valid = true;
  return function() {
    if (!valid) {
      //休息时间 暂不接客
      return false;
    }
    // 工作时间，执行函数并且在间隔期内把状态位设为无效
    valid = false;
    setTimeout(() => {
      fn();
      valid = true;
    }, delay);
  };
};
