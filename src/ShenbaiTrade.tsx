import React, { useState, useEffect } from "react";
import {
  Phone,
  X,
  Download,
  Calculator,
  ChevronRight,
  Menu,
  ShieldCheck,
  Factory,
  BookOpen,
  Users,
} from "lucide-react";

// --- 类型定义 ---
interface Product {
  id: string;
  title: string;
  description: string;
  advantages: string[];
  specs: { label: string; value1: string; value2: string }[];
  image: string;
}

const ShenbaiTrade: React.FC = () => {
  // --- 状态管理 ---
  const [activeTab, setActiveTab] = useState("drywall");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // --- 模拟数据 ---
  const slides = [
    {
      title: "钉准每一毫米，固守万钧之力",
      desc: "专注紧固系统精工制造，为钢结构、装配式建筑提供值得托付的国产紧固解决方案",
    },
    {
      title: "高强耐蚀 精准咬合",
      desc: "干壁钉·钻尾丝·全螺纹螺柱，三大主力产品满足全场景适配需求",
    },
    {
      title: "邯郸智造 值得托付",
      desc: "ISO认证品质，全流程可视化生产，破除信任疑虑",
    },
  ];

  const products: Record<string, Product> = {
    drywall: {
      id: "drywall",
      title: "干壁钉 - 轻钢龙骨专用",
      description:
        "采用优质碳钢制造，表面磷化处理，具有优异的抗腐蚀性能和高强度特性，专为轻钢龙骨安装设计。",
      advantages: [
        "磷化表面处理，防锈能力提升80%",
        "十字沉头设计，钉头与基材齐平",
        "螺纹精密咬合，不易滑牙",
        "适配主流0.8-1.2mm轻钢龙骨",
      ],
      specs: [
        { label: "适配基材", value1: "0.8mm镀锌板", value2: "1.0mm镀锌板" },
        { label: "单点承重", value1: "≥12kg", value2: "≥15kg" },
        { label: "安装力矩", value1: "8-10 N·m", value2: "10-12 N·m" },
      ],
      image:
        "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800",
    },
    drill: {
      id: "drill",
      title: "钻尾丝 - 自钻自攻一体化",
      description:
        "无需预钻孔，一次完成钻孔、攻丝、紧固三大工序，大幅提高钢结构屋面安装效率。",
      advantages: [
        "钻尾尖部淬火处理，硬度达HRC55以上",
        "表面达克罗处理，盐雾测试1000h",
        "施工效率提升60%",
        "六角头带垫片设计，密封防松",
      ],
      specs: [
        { label: "适配基材", value1: "1.2mm镀锌板", value2: "1.5mm镀锌板" },
        { label: "单点承重", value1: "≥18kg", value2: "≥22kg" },
        { label: "安装力矩", value1: "15-18 N·m", value2: "18-20 N·m" },
      ],
      image:
        "https://images.unsplash.com/photo-1530124560676-5cd747444a14?auto=format&fit=crop&q=80&w=800",
    },
    // 其他产品可按此结构扩展...
  };

  // --- 自动轮播逻辑 ---
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      {/* 导航栏 */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="text-2xl font-bold text-slate-800">
            申佰贸易 <span className="text-blue-600 font-light">|</span>{" "}
            <span className="text-sm font-medium text-gray-500">
              紧固系统专家
            </span>
          </div>
          <nav className="hidden md:flex space-x-8 font-medium">
            {["首页", "精工品系", "智造现场", "工程智库", "联建伙伴"].map(
              (item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  className="hover:text-blue-600 transition-colors"
                >
                  {item}
                </a>
              )
            )}
          </nav>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-slate-800 text-white px-6 py-2 rounded shadow-lg hover:bg-slate-700 transition-all"
          >
            一键询价
          </button>
        </div>
      </header>

      {/* Hero 轮播图 */}
      <section className="relative h-[70vh] overflow-hidden bg-slate-900">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 flex items-center justify-center ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
            style={{
              background:
                "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=1600) center/cover",
            }}
          >
            <div className="text-center text-white px-4 max-w-4xl">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up">
                {slide.title}
              </h1>
              <p className="text-lg md:text-xl mb-8 text-gray-200">
                {slide.desc}
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg transition-transform hover:scale-105">
                了解更多
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* 核心参数 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                label: "抗拉强度",
                value: "≥8.8",
                unit: "级",
                desc: "高强度标准，远超行业平均",
              },
              {
                label: "扭矩值",
                value: "45",
                unit: "N·m",
                desc: "精准扭矩控制，确保稳定",
              },
              {
                label: "防腐等级",
                value: "1000",
                unit: "h",
                desc: "中性盐雾测试，卓越耐蚀",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-8 bg-gray-50 rounded-xl text-center shadow-sm hover:shadow-md transition-shadow border-t-4 border-blue-600"
              >
                <h3 className="text-gray-600 mb-2 font-medium">{item.label}</h3>
                <div className="text-5xl font-bold text-blue-600 my-4">
                  {item.value}
                  <span className="text-xl ml-1">{item.unit}</span>
                </div>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 精工品系 - Tabs */}
      <section id="精工品系" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 relative pb-4">
            精工品系
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-blue-600"></span>
          </h2>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {Object.keys(products).map((key) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-8 py-2 rounded-full font-medium transition-all ${
                  activeTab === key
                    ? "bg-slate-800 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
              >
                {products[key].title.split(" - ")[0]}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
            <div className="md:w-1/2 h-80 md:h-auto overflow-hidden">
              <img
                src={products[activeTab].image}
                alt={products[activeTab].title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="md:w-1/2 p-8 md:p-12">
              <h3 className="text-2xl font-bold text-slate-800 mb-4">
                {products[activeTab].title}
              </h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                {products[activeTab].description}
              </p>

              <div className="bg-blue-50 p-6 rounded-lg mb-8 border-l-4 border-blue-600">
                <h4 className="font-bold text-blue-900 mb-3">核心产品优势</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-blue-800">
                  {products[activeTab].advantages.map((adv, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <ShieldCheck size={16} /> {adv}
                    </li>
                  ))}
                </ul>
              </div>

              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-gray-700">
                    {products[activeTab].specs.map((s, i) => (
                      <th key={i} className="p-3 text-left border">
                        {s.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {products[activeTab].specs.map((s, i) => (
                      <td key={i} className="p-3 border font-medium">
                        {s.value1}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    {products[activeTab].specs.map((s, i) => (
                      <td key={i} className="p-3 border font-medium">
                        {s.value2}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 询价弹窗 */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-2xl p-8 relative animate-in fade-in zoom-in duration-300">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>
            <h3 className="text-2xl font-bold mb-6 text-slate-800 flex items-center gap-2">
              <Phone className="text-blue-600" /> 一键询价
            </h3>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-medium mb-1">
                  您的姓名
                </label>
                <input
                  type="text"
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="请输入姓名"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  联系电话
                </label>
                <input
                  type="tel"
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="请输入手机号"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  意向产品
                </label>
                <select className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none">
                  <option>干壁钉</option>
                  <option>钻尾丝</option>
                  <option>全螺纹螺柱</option>
                </select>
              </div>
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors mt-4">
                立即提交
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 悬浮按钮 */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-8 right-8 w-14 h-14 bg-blue-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform z-40"
      >
        <Phone size={24} />
      </button>

      {/* 页脚 */}
      <footer className="bg-slate-900 text-gray-400 py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="text-white text-xl font-bold mb-4">
            邯郸市申佰贸易有限公司
          </div>
          <p className="mb-8">© 2025 申佰贸易 | 钉准每一毫米，固守万钧之力</p>
          <div className="flex justify-center space-x-6 text-sm">
            <a href="#" className="hover:text-white">
              隐私政策
            </a>
            <a href="#" className="hover:text-white">
              服务条款
            </a>
            <a href="#" className="hover:text-white">
              联系我们
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ShenbaiTrade;
