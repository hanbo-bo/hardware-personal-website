import React, { useState } from 'react';

const ContactForm = () => {
  // 1. 使用 useState 管理表单状态
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    product: '默认产品' // 假设你的下拉框默认值
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // 处理输入框变化
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 2. 提交处理函数
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // 阻止表单默认刷新行为

    const { name, phone, product } = formData;

    // 验证逻辑
    if (!name.trim() || !phone.trim()) {
      alert('请填写您的称呼和手机号码哦！');
      return;
    }

    setIsSubmitting(true);

    try {
      // 3. 发送请求 (这里的 URL 需对应你的后端接口)
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, product })
      });

      if (response.ok) {
        setIsSuccess(true);
        alert('提交成功！业务经理正在快马加鞭为您核算底价，请留意陌生来电。');
        // 清空表单
        setFormData({ name: '', phone: '', product: '默认产品' });
      } else {
        throw new Error('提交失败');
      }
    } catch (error) {
      alert('网络好像开小差了，请稍后再试或直接拨打客服电话。');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
    className="space-y-5"
    // onSubmit={(e) => {
    //   e.preventDefault();
    //   alert("提交成功，我们将尽快联系您！");
    //   setIsModalOpen(false);
    // }}
onSubmit={handleSubmit} className="space-y-4"
 >
    <div>
      <label className="block text-sm font-bold text-slate-700 mb-2">
        联系人姓名 *
      </label>
      <input
        required
        type="text"
        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
        placeholder="请输入您的称呼"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
    
    </div>
    <div>
      <label className="block text-sm font-bold text-slate-700 mb-2">
        手机号码 *
      </label>
      <input
        required
        type="tel"
        name="phone"
        placeholder="请输入手机号"
        value={formData.phone}
        onChange={handleChange}
        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
      />
    </div>
    <div>
      <label className="block text-sm font-bold text-slate-700 mb-2">
        需求产品及规格
      </label>
      <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-700"
        name="product" 
        value={formData.product} 
        onChange={handleChange}
      >
        <option>干壁钉系列</option>
        <option>钻尾丝系列</option>
        <option>全螺纹螺柱</option>
        <option>其他非标定制件</option>
      </select>
    </div>
    {/* <button
      type="submit"
      className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors mt-6 shadow-lg shadow-blue-600/30"
    >
      立即提交需求
    </button> */}
        <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full text-white py-4 rounded-xl font-bold text-lg transition-all mt-6 shadow-lg 
          ${isSuccess ? 'bg-green-600 shadow-green-600/30' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/30'}
          ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'opacity-100'}
        `}
      >
        {isSubmitting ? '提交中...' : isSuccess ? '提交成功！' : '立即提交需求'}
      </button>
        {/* 姓名输入框 */}
      {/* 手机号输入框 */}
      {/* 产品选择 (示例) */}
      {/* 提交按钮 */}
  </form>
  );
};

export default ContactForm;