import React, { useEffect, useState } from "react";
import axios from "axios";
import { CheckCircle2, Loader2, Send, MessageSquare } from "lucide-react";

const ContactForm = () => {
  const initialFormState = {
    name: "",
    phone: "",
    product: "干壁钉系列",
    message: "", // 新增：留言字段
  };
  // 状态管理
  const [formData, setFormData] = useState(initialFormState);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [countdown, setCountdown] = useState(0);
  // 处理输入框变化
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    // 限制留言字数在 200 字以内
    if (name === "message" && value.length > 200) return;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // 2. 提交处理函数 (使用 Axios)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting || isSuccess) return;

    const { name, phone, product, message } = formData;

    // 验证逻辑
    if (!name.trim() || !phone.trim()) {
      alert("请填写姓名和手机号");
      return;
    }

    const phoneRegex = /^1[3-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
      alert("请输入正确的11位手机号码");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post(
        `/api/submit-form`,
        { name, phone, product, message }, // 将留言一并发送
        {
          headers: { "Content-Type": "application/json" },
          timeout: 10000,
        }
      );

      if (response.data.success || response.status === 200) {
        setIsSuccess(true);
        setCountdown(5); // 5秒后重置
      }
    } catch (error: any) {
      console.error("提交错误:", error);
      alert(error.response?.data?.error || "提交失败，请检查网络后重试");
      setIsSubmitting(false);
    }
  };

  // 倒计时逻辑：成功后自动重置表单
  useEffect(() => {
    let timer = +new Date();
    if (isSuccess && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (isSuccess && countdown === 0) {
      // 倒计时结束，重置状态
      setIsSuccess(false);
      setIsSubmitting(false);
      setFormData(initialFormState);
    }
    return () => clearTimeout(timer);
  }, [isSuccess, countdown]);

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-100 mx-auto">
      {/* 成功后的全覆盖倒计时提示层 */}
      {isSuccess && (
        <div className="absolute inset-0 z-20 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-300">
          {/* 成功图标动画 */}
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4 animate-bounce">
            <CheckCircle2 size={48} />
          </div>

          <h3 className="text-2xl font-bold text-slate-900 mb-2">提交成功！</h3>
          <p className="text-slate-600 mb-6">
            加急申请已推送至业务经理飞书
            <br />
            请保持电话畅通，我们将在30分钟内联系您
          </p>

          {/* 倒计时进度圈或数字 */}
          <div className="flex flex-col items-center">
            <div className="relative w-12 h-12 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="transparent"
                  className="text-slate-100"
                />
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="transparent"
                  strokeDasharray={126}
                  strokeDashoffset={126 - (126 * countdown) / 5}
                  className="text-green-500 transition-all duration-1000 ease-linear"
                />
              </svg>
              <span className="absolute text-sm font-bold text-slate-700">
                {countdown}s
              </span>
            </div>
            <button
              onClick={() => {
                setCountdown(0);
              }} // 点击立即重置/关闭
              className="mt-4 text-xs text-slate-400 hover:text-blue-600 underline"
            >
              继续浏览产品
            </button>
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 第一行：姓名与手机并排 (针对笔记本优化) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              联系人姓名 *
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="如：张先生"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              手机号码 *
            </label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="请输入手机号"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all"
            />
          </div>
        </div>

        {/* 第二行：产品选择 */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            需求产品
          </label>
          <select
            name="product"
            value={formData.product}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none text-sm cursor-pointer"
          >
            <option value="干壁钉系列">干壁钉系列</option>
            <option value="自攻螺钉系列">自攻螺钉系列</option>
            <option value="膨胀螺栓系列">膨胀螺栓系列</option>
            <option value="其他大宗采购">其他大宗采购</option>
          </select>
        </div>

        {/* 第三行：留言备注 */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-xs font-semibold text-gray-600 flex items-center">
              <MessageSquare className="w-3 h-3 mr-1" /> 更多需求说明 (可选)
            </label>
            <span className="text-[10px] text-gray-400">
              {formData.message.length}/200
            </span>
          </div>
          <textarea
            name="message"
            rows={3}
            disabled={isSubmitting || isSuccess}
            value={formData.message}
            onChange={handleChange}
            placeholder="请填写具体规格、数量或其他特殊要求..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all disabled:bg-gray-50 resize-none text-sm"
          />
          {/* <textarea
            name="message"
            rows={2}
            value={formData.message}
            onChange={handleChange}
            placeholder="填写规格、数量等..."
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm resize-none"
          /> */}
        </div>

        {/* 提交按钮 */}
        <button
          type="submit"
          disabled={isSubmitting || isSuccess}
          className={`w-full font-bold py-3 rounded-xl transition-all flex items-center justify-center shadow-lg
            ${
              isSuccess
                ? "bg-green-500 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }
            ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : "active:scale-95"
            }
          `}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin h-5 w-5 mr-2" /> 正在发送申请...
            </>
          ) : isSuccess ? (
            <>
              <CheckCircle2 className="h-5 w-5 mr-2" /> 提交成功 ({countdown}s)
            </>
          ) : (
            <>
              <Send className="h-4 w-4 mr-2" /> 立即获取底价报价
            </>
          )}
        </button>
      </form>

      <p className="mt-4 text-xs text-gray-400 text-center">
        🛡️ 信息已加密处理 · 仅用于申佰贸易询价服务
      </p>
    </div>
  );
};

export default ContactForm;

// scp -r ./dist/* root@ip:/var/www/shenbai/
