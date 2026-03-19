import React, { useState, useEffect } from "react";
import {
  Phone,
  X,
  ShieldCheck,
  Factory,
  Award,
  Wrench,
  CheckCircle2,
  ChevronRight,
  Menu,
  Hexagon,
  Globe,
} from "lucide-react";

import ContactForm from "./component/ContactForm";

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // --- 模拟数据 ---
  const slides = [
    {
      title: "钉准每一毫米，固守万钧之力",
      desc: "专注紧固系统精工制造，为钢结构、装配式建筑提供值得托付的国产紧固解决方案",
      bg: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=1600",
    },
    {
      title: "高强耐蚀 精准咬合",
      desc: "干壁钉·钻尾丝·全螺纹螺柱，三大主力产品满足全场景适配需求",
      bg: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1600",
    },
    {
      title: "邯郸智造 值得托付",
      desc: "ISO认证品质，全流程可视化生产，破除信任疑虑",
      bg: "https://images.unsplash.com/photo-1530124560676-5cd747444a14?auto=format&fit=crop&q=80&w=1600",
    },
  ];

  const products: Record<string, Product> = {
    drywall: {
      id: "drywall",
      title: "干壁钉 - 轻钢龙骨专用",
      description:
        "采用优质碳钢制造，表面磷化处理，具有优异的抗腐蚀性能和高强度特性，专为轻钢龙骨安装设计，确保建筑结构的长期稳固。",
      advantages: [
        "磷化表面处理，防锈能力提升80%",
        "十字沉头设计，钉头与基材完美平齐",
        "螺纹精密咬合，高抗拉拔不易滑牙",
        "精通适配主流0.8-1.2mm轻钢龙骨",
      ],
      specs: [
        { label: "适配基材", value1: "0.8mm 镀锌板", value2: "1.0mm 镀锌板" },
        { label: "单点承重", value1: "≥ 12 kg", value2: "≥ 15 kg" },
        { label: "安装力矩", value1: "8-10 N·m", value2: "10-12 N·m" },
      ],
      image:
        "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800",
    },
    drill: {
      id: "drill",
      title: "钻尾丝 - 自钻自攻一体",
      description:
        "无需预钻孔，一次完成钻孔、攻丝、紧固三大工序，大幅提高钢结构屋面及外墙的安装效率，降低人工成本。",
      advantages: [
        "钻尾尖部高频淬火，硬度达HRC55+",
        "表面达克罗处理，中性盐雾测试1000h",
        "单兵施工效率对比传统工艺提升60%",
        "六角头带EPDM垫片设计，绝佳密封防水",
      ],
      specs: [
        { label: "适配基材", value1: "1.2mm 镀锌板", value2: "1.5mm 镀锌板" },
        { label: "单点承重", value1: "≥ 18 kg", value2: "≥ 22 kg" },
        { label: "安装力矩", value1: "15-18 N·m", value2: "18-20 N·m" },
      ],
      image:
        "https://images.unsplash.com/photo-1530124560676-5cd747444a14?auto=format&fit=crop&q=80&w=800",
    },
  };

  // --- 自动轮播逻辑 ---
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-blue-600 selection:text-white">
      {/* --- 导航栏 --- */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
              申佰
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-slate-900 leading-tight">
                申佰贸易
              </span>
              <span className="text-xs font-medium text-slate-500 tracking-widest">
                紧固系统专家
              </span>
            </div>
          </div>

          {/* 桌面端导航 */}
          <nav className="hidden md:flex items-center space-x-8">
            {["首页", "精工品系", "智造现场", "联建伙伴"].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors"
              >
                {item}
              </a>
            ))}
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-bold shadow-lg shadow-blue-600/30 hover:bg-blue-700 hover:shadow-blue-600/50 transition-all flex items-center gap-2"
            >
              <Phone size={16} /> 索取报价
            </button>
          </nav>

          {/* 移动端菜单按钮 */}
          <button
            className="md:hidden text-slate-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* --- Hero 轮播图 --- */}
      <section
        id="首页"
        className="relative h-[80vh] min-h-[600px] overflow-hidden bg-slate-900"
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out flex items-center ${
              index === currentSlide
                ? "opacity-100 scale-100 z-10"
                : "opacity-0 scale-105 z-0"
            }`}
            style={{
              background: `linear-gradient(to right, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0.4) 100%), url(${slide.bg})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            <div className="container mx-auto px-4">
              <div className="max-w-3xl transform translate-y-[-10%]">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-sm font-medium mb-6 border border-blue-500/30 backdrop-blur-sm">
                  <Hexagon size={14} /> 工业级标准制造
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl mb-10 text-slate-300 leading-relaxed max-w-2xl">
                  {slide.desc}
                </p>
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-lg font-bold transition-all shadow-lg shadow-blue-600/30 flex items-center gap-2"
                  >
                    获取工程方案 <ChevronRight size={20} />
                  </button>
                  <a
                    href="#精工品系"
                    className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-lg font-bold transition-all backdrop-blur-md"
                  >
                    浏览产品目录
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* 轮播指示器 */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all duration-500 ${
                currentSlide === idx ? "w-8 bg-blue-500" : "w-2 bg-white/50"
              }`}
            />
          ))}
        </div>
      </section>

      {/* --- 核心数据指标 --- */}
      <section className="relative -mt-16 z-30 pb-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <Award className="text-blue-500" size={32} />,
                label: "抗拉强度",
                value: "≥8.8",
                unit: "级",
                desc: "国标高强，远超行业平均线",
              },
              {
                icon: <Wrench className="text-blue-500" size={32} />,
                label: "精准扭矩",
                value: "45",
                unit: "N·m",
                desc: "全自动品控，确保受力稳定",
              },
              {
                icon: <ShieldCheck className="text-blue-500" size={32} />,
                label: "防腐等级",
                value: "1000",
                unit: "h",
                desc: "中性盐雾测试，卓越耐候蚀",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-2xl shadow-xl shadow-slate-200/50 flex flex-col items-center text-center border border-slate-100 hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="mb-4 p-4 bg-blue-50 rounded-full">
                  {item.icon}
                </div>
                <h3 className="text-slate-500 font-semibold mb-2">
                  {item.label}
                </h3>
                <div className="text-4xl font-extrabold text-slate-900 mb-2">
                  {item.value}
                  <span className="text-lg ml-1 text-slate-600">
                    {item.unit}
                  </span>
                </div>
                <p className="text-slate-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 精工品系 --- */}
      <section id="精工品系" className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
              核心精工品系
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              针对不同施工场景深度优化的紧固件系列，满足您对结构安全与施工效率的双重苛刻要求。
            </p>
          </div>

          {/* Tabs 切换 */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {Object.keys(products).map((key) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-8 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
                  activeTab === key
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30 scale-105"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {products[key].title.split(" - ")[0]}
              </button>
            ))}
          </div>

          {/* 产品详情卡片 */}
          <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden flex flex-col lg:flex-row border border-slate-100">
            {/* 左侧图片 */}
            <div className="lg:w-5/12 h-64 lg:h-auto relative overflow-hidden group">
              <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-transparent transition-colors z-10" />
              <img
                src={products[activeTab].image}
                alt={products[activeTab].title}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
              />
            </div>

            {/* 右侧信息 */}
            <div className="lg:w-7/12 p-8 lg:p-12">
              <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 font-bold text-xs rounded-full mb-4">
                主打产品
              </div>
              <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4">
                {products[activeTab].title}
              </h3>
              <p className="text-slate-600 mb-8 leading-relaxed text-lg">
                {products[activeTab].description}
              </p>

              {/* 核心优势 */}
              <div className="grid sm:grid-cols-2 gap-4 mb-10">
                {products[activeTab].advantages.map((adv, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2
                      className="text-blue-500 shrink-0 mt-0.5"
                      size={20}
                    />
                    <span className="text-slate-700 font-medium text-sm leading-snug">
                      {adv}
                    </span>
                  </div>
                ))}
              </div>

              {/* 规格参数表 (修复版) */}
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 text-slate-600">
                    <tr>
                      <th className="p-4 font-semibold border-b border-slate-200">
                        核心参数
                      </th>
                      <th className="p-4 font-semibold border-b border-slate-200">
                        常规规格 (Type A)
                      </th>
                      <th className="p-4 font-semibold border-b border-slate-200">
                        加强规格 (Type B)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {products[activeTab].specs.map((s, i) => (
                      <tr
                        key={i}
                        className="hover:bg-blue-50/50 transition-colors"
                      >
                        <td className="p-4 font-semibold text-slate-800 bg-slate-50/50">
                          {s.label}
                        </td>
                        <td className="p-4 text-slate-600">{s.value1}</td>
                        <td className="p-4 text-slate-600">{s.value2}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- 智造现场 (新增补全) --- */}
      <section id="智造现场" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
                扎根邯郸，服务全球
              </h2>
              <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                依托中国紧固件之都的完善产业链，申佰贸易引入全自动冷镦机与智能热处理生产线。从原材料拉丝到成品表面处理，实现全生命周期溯源管控。
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  {
                    title: "产能保障",
                    desc: "日产能突破 50 吨，常规型号海量现货",
                  },
                  {
                    title: "严苛品控",
                    desc: "配备万能拉力试验机、盐雾测试箱，批批检测",
                  },
                  {
                    title: "定制服务",
                    desc: "支持非标异形件开模定制，7天快速打样",
                  },
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100"
                  >
                    <Factory className="text-blue-600 shrink-0" size={24} />
                    <div>
                      <h4 className="font-bold text-slate-900">{item.title}</h4>
                      <p className="text-sm text-slate-500 mt-1">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:w-1/2 grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1565514020179-026b92b84bb6?auto=format&fit=crop&q=80&w=400"
                alt="Factory"
                className="rounded-2xl shadow-lg"
              />
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=400"
                alt="Equipment"
                className="rounded-2xl shadow-lg mt-8"
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- 联建伙伴 (新增补全) --- */}
      <section id="联建伙伴" className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">他们选择信任申佰</h2>
          <p className="text-slate-400 mb-12">
            为超过 500+ 中大型钢构企业及总包单位提供长期紧固支持
          </p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-70">
            {/* 这里用占位图标模拟企业 Logo */}
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 text-xl font-bold text-slate-300"
              >
                <Globe size={32} /> 知名建设集团 {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 询价弹窗 --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          ></div>
          <div className="bg-white w-full max-w-lg rounded-3xl p-8 relative shadow-2xl z-10 animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-6 top-6 text-slate-400 hover:text-slate-800 transition-colors bg-slate-100 rounded-full p-2"
            >
              <X size={20} />
            </button>

            <div className="mb-8 text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Phone size={32} />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900">
                获取大宗采购报价
              </h3>
              <p className="text-slate-500 mt-2 text-sm">
                业务经理将在 30 分钟内与您联系，提供专属出厂底价
              </p>
            </div>
            <ContactForm />
            <p className="mt-4 text-[10px] text-gray-400 text-center uppercase tracking-widest">
              Secure & Confidential Service
            </p>
          </div>
        </div>
      )}

      {/* --- 悬浮操作按钮 --- */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-blue-600 text-white rounded-2xl shadow-2xl shadow-blue-600/40 flex flex-col items-center justify-center hover:-translate-y-2 transition-transform z-40 group"
      >
        <Phone size={24} className="group-hover:animate-bounce" />
        <span className="text-[10px] font-bold mt-1">询价</span>
      </button>

      {/* --- 页脚 --- */}
      <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-800">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="text-white text-2xl font-extrabold mb-4">
                邯郸市申佰贸易有限公司
              </div>
              <p className="text-sm leading-relaxed max-w-sm">
                专注紧固系统精工制造，为建筑、工业提供高标准、全品类的紧固件解决方案。立足邯郸，服务全球工程建设。
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">快捷链接</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#首页"
                    className="hover:text-blue-400 transition-colors"
                  >
                    关于我们
                  </a>
                </li>
                <li>
                  <a
                    href="#精工品系"
                    className="hover:text-blue-400 transition-colors"
                  >
                    产品中心
                  </a>
                </li>
                <li>
                  <a
                    href="#智造现场"
                    className="hover:text-blue-400 transition-colors"
                  >
                    工厂实力
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">联系方式</h4>
              <ul className="space-y-2 text-sm">
                <li>客服热线：400-XXX-XXXX</li>
                <li>业务邮箱：sales@shenbai.com</li>
                <li>工厂地址：河北省邯郸市永年区紧固件产业园</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-sm flex flex-col md:flex-row justify-between items-center">
            <p>© 2026 申佰贸易 保留所有权利 | 钉准每一毫米，固守万钧之力</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">
                冀ICP备XXXXXXXX号
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ShenbaiTrade;
