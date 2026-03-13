import { useState } from "react";
import {
  Box,
  CheckSquare,
  ChevronDown,
  Cloud,
  Crown,
  Edit2,
  FileBox,
  FolderOpen,
  HelpCircle,
  Image as ImageIcon,
  Layers,
  Mic,
  Music,
  PlayCircle,
  Search,
  ShieldCheck,
  Tag,
  Trash2,
  Users,
  Volume2,
  Wand2,
  X,
} from "lucide-react";

const mockMyFiles = [
  { id: "1", category: "image", name: "图片_757", emoji: "⛅", hasCrown: false, details: { size: "836KB", dimensions: "924x728", format: "png", refCount: 1, actionLabel: "存为纹理", actionStyle: "bg-white text-gray-800 border" } },
  { id: "2", category: "image", name: "图片_756", emoji: "🏠", hasCrown: false, details: { size: "1.2MB", dimensions: "1024x1024", format: "png", refCount: 3, actionLabel: "存为纹理", actionStyle: "bg-white text-gray-800 border" } },
  { id: "3", category: "image", name: "图片_758", emoji: "📷", hasCrown: false, details: { size: "500KB", dimensions: "800x600", format: "jpg", refCount: 0, actionLabel: "存为纹理", actionStyle: "bg-white text-gray-800 border" } },
  { id: "4", category: "image", name: "图片_528", emoji: "🛒", hasCrown: false, details: { size: "2MB", dimensions: "1920x1080", format: "png", refCount: 5, actionLabel: "存为纹理", actionStyle: "bg-white text-gray-800 border" } },
  { id: "5", category: "texture", name: "自定义纹理_765", emoji: "🐺", hasCrown: true, details: { size: "1.5MB", format: "texture", refCount: 1, actionLabel: "导入", actionStyle: "bg-[#fcd53f] text-black font-bold" } },
  { id: "6", category: "texture", name: "自定义纹理_764", emoji: "🐱", hasCrown: true, details: { size: "3.2MB", format: "texture", refCount: 2, actionLabel: "导入", actionStyle: "bg-[#fcd53f] text-black font-bold" } },
  { id: "7", category: "model", name: "bannanacatnew2", emoji: "🍌", hasCrown: true, details: { size: "870KB", textureSize: "772KB", animSize: "0B", refCount: 1, actionLabel: "转化为角色预设", actionStyle: "bg-[#fcd53f] text-black font-bold" } },
  { id: "8", category: "model", name: "6tui", emoji: "🦵", hasCrown: true, details: { size: "400KB", textureSize: "200KB", animSize: "100KB", refCount: 8, actionLabel: "转化为角色预设", actionStyle: "bg-[#fcd53f] text-black font-bold" } },
  { id: "9", category: "image", name: "图片_522", emoji: "😺", hasCrown: true, details: { size: "1MB", dimensions: "1000x1000", format: "png", refCount: 2, actionLabel: "存为纹理", actionStyle: "bg-white text-gray-800 border" } },
  { id: "a1", category: "audio", name: "音频_1950", formatTag: "wav", duration: "00:03", hasCrown: false, details: { size: "148KB", duration: "00:03", format: "wav", refCount: 0 } },
  { id: "a2", category: "audio", name: "音频_1949", formatTag: "mp3", duration: "00:27", hasCrown: false, details: { size: "840KB", duration: "00:27", format: "mp3", refCount: 2 } },
  { id: "a3", category: "audio", name: "lovesickgirl", formatTag: "mp3", duration: "00:15", hasCrown: false, details: { size: "500KB", duration: "00:15", format: "mp3", refCount: 1 } },
  { id: "a4", category: "audio", name: "fancy", formatTag: "mp3", duration: "00:14", hasCrown: false, details: { size: "480KB", duration: "00:14", format: "mp3", refCount: 5 } },
  { id: "v1", category: "ai_voice", name: "医生套装限时...", formatTag: "mp3", duration: "00:05", hasCrown: false, details: { size: "200KB", duration: "00:05", format: "mp3", refCount: 1 } },
  { id: "v2", category: "ai_voice", name: "恭喜你完成...", formatTag: "mp3", duration: "00:08", hasCrown: false, details: { size: "320KB", duration: "00:08", format: "mp3", refCount: 0 } },
];

const mockCobuildFiles = [
  { id: "11", category: "texture", name: "共建_纹理_01", emoji: "🎨", hasCrown: false, author: "UserA", details: { size: "2.5MB", format: "texture", refCount: 12, actionLabel: "导入", actionStyle: "bg-[#fcd53f] text-black font-bold" } },
  { id: "12", category: "model", name: "共建_香蕉猫模型", emoji: "🍌", hasCrown: false, author: "UserB", details: { size: "950KB", textureSize: "800KB", animSize: "50KB", refCount: 45, actionLabel: "转化为角色预设", actionStyle: "bg-[#fcd53f] text-black font-bold" } },
  { id: "13", category: "image", name: "共建_场景贴图", emoji: "📦", hasCrown: true, author: "UserC", details: { size: "5MB", dimensions: "4096x4096", format: "png", refCount: 8, actionLabel: "存为纹理", actionStyle: "bg-white text-gray-800 border" } },
  { id: "c_a1", category: "audio", name: "共建_环境音_01", formatTag: "mp3", duration: "01:20", hasCrown: false, author: "AudioMaster", details: { size: "2.1MB", duration: "01:20", format: "mp3", refCount: 22 } },
  { id: "c_a2", category: "audio", name: "共建_点击音效", formatTag: "wav", duration: "00:01", hasCrown: false, author: "AudioMaster", details: { size: "45KB", duration: "00:01", format: "wav", refCount: 105 } },
];

const navItems = [
  { key: "image", label: "图片", icon: ImageIcon },
  { key: "audio", label: "音频", icon: Music },
  { key: "ai_voice", label: "AI朗读", icon: Mic },
  { key: "texture", label: "纹理", icon: Layers },
  { key: "effect", label: "特效", icon: Wand2 },
  { key: "model", label: "自定义模型", icon: Box },
];

function getActionButtonSizeClass(label) {
  if (!label) {
    return "";
  }

  if (label.includes("角色预设")) {
    return "h-8 min-w-[132px] px-4 text-[13px]";
  }

  if (label.includes("纹理")) {
    return "h-8 min-w-[92px] px-4 text-[13px]";
  }

  return "h-8 min-w-[84px] px-4 text-[13px]";
}

export default function App() {
  const [activeCategory, setActiveCategory] = useState("image");
  const [activeTab, setActiveTab] = useState("my");
  const [isMultiSelect, setIsMultiSelect] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [showMoveModal, setShowMoveModal] = useState(false);
  const [permissionLevel, setPermissionLevel] = useState("shared");
  const [selectedFileDetails, setSelectedFileDetails] = useState(null);

  const baseFiles = activeTab === "my" ? mockMyFiles : mockCobuildFiles;
  const currentFiles = baseFiles.filter((file) => file.category === activeCategory);

  const resetSelectionState = () => {
    setIsMultiSelect(false);
    setSelectedIds([]);
  };

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    resetSelectionState();
    setSelectedFileDetails(null);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    resetSelectionState();
    setSelectedFileDetails(null);
  };

  const toggleMultiSelect = () => {
    setIsMultiSelect((value) => !value);
    setSelectedIds([]);
    setSelectedFileDetails(null);
  };

  const toggleSelect = (id) => {
    setSelectedIds((ids) =>
      ids.includes(id) ? ids.filter((itemId) => itemId !== id) : [...ids, id],
    );
  };

  const selectAll = () => {
    setSelectedIds(currentFiles.map((file) => file.id));
  };

  const handleItemClick = (file) => {
    if (isMultiSelect) {
      toggleSelect(file.id);
      return;
    }

    setSelectedFileDetails(file);
  };

  return (
    <div className="flex h-screen w-full bg-[#f0f4f8] text-sm text-gray-700">
      <div className="w-48 shrink-0 flex flex-col bg-[#2d2f31] text-gray-300">
        <div className="flex items-center gap-2 border-b border-gray-700 p-4 text-lg font-bold text-white">
          <FileBox className="text-yellow-400" />
          文件管理
        </div>

        <div className="flex flex-col py-2">
          {navItems.map(({ key, label, icon: Icon }) => (
            <NavItem
              key={key}
              icon={<Icon size={18} />}
              label={label}
              active={activeCategory === key}
              onClick={() => handleCategoryChange(key)}
            />
          ))}
        </div>

        <div className="mt-auto border-t border-gray-700 p-4">
          <div className="mb-2 flex items-center gap-2 text-xs">
            <Cloud size={14} />
            云端空间
          </div>
          <div className="mb-1 h-2 w-full rounded-full bg-gray-700">
            <div className="h-2 rounded-full bg-blue-400" style={{ width: "30%" }} />
          </div>
          <div className="mb-4 text-xs text-gray-500">621M/2000M</div>

          <div className="mb-2 flex items-center gap-2 text-xs">
            <CheckSquare size={14} />
            文件数量
          </div>
          <div className="mb-1 h-2 w-full rounded-full bg-gray-700">
            <div className="h-2 rounded-full bg-blue-400" style={{ width: "19%" }} />
          </div>
          <div className="text-xs text-gray-500">1938/10000</div>
        </div>
      </div>

      <div className="relative flex min-w-0 flex-1 flex-col overflow-hidden bg-[#eef3fa]">
        <div className="flex items-center justify-between border-b border-blue-100/50 bg-[#e4ebf5] px-6 py-4">
          {!isMultiSelect ? (
            <>
              <div className="flex items-center gap-6">
                <div className="flex rounded-full border border-gray-300 bg-gray-200/60 p-1">
                  <button
                    onClick={() => handleTabChange("my")}
                    className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${activeTab === "my" ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-800"}`}
                  >
                    我的文件
                  </button>
                  <button
                    onClick={() => handleTabChange("cobuild")}
                    className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${activeTab === "cobuild" ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-800"}`}
                  >
                    共建可见
                  </button>
                </div>

                {activeTab === "my" && (
                  <div className="flex gap-2">
                    <button className="rounded-full bg-[#fcd53f] px-4 py-1.5 font-medium text-black shadow-sm">
                      全部
                    </button>
                    <button className="rounded-full bg-gray-400/20 px-4 py-1.5 text-gray-600">
                      2333
                    </button>
                    <button className="rounded-full bg-gray-400/20 px-4 py-1.5 text-gray-600">
                      53343
                    </button>
                    <button className="flex items-center rounded-full bg-gray-400/20 px-3 py-1.5 text-gray-600">
                      <ChevronDown size={16} />
                    </button>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3">
                <button className="flex items-center gap-1 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-gray-600 shadow-sm">
                  <span className="inline-block -scale-y-100 transform">1</span>
                  最新
                  <ChevronDown size={14} />
                </button>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="搜索"
                    className="w-48 rounded-full border-none bg-white py-1.5 pl-3 pr-8 shadow-sm outline-none focus:ring-2 focus:ring-blue-300"
                  />
                  <Search size={16} className="absolute right-3 top-2 text-gray-400" />
                </div>
                {activeTab === "my" && (
                  <button
                    onClick={toggleMultiSelect}
                    className="rounded-full bg-cyan-300 px-5 py-1.5 font-medium text-cyan-900 shadow-sm transition-colors hover:bg-cyan-400"
                  >
                    多选
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="flex w-full items-center justify-between">
              <div className="text-lg font-bold text-gray-800">
                已选: <span className="text-blue-600">{selectedIds.length}</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => selectedIds.length > 0 && setShowMoveModal(true)}
                  className={`flex items-center gap-1 rounded-full px-4 py-1.5 font-medium shadow-sm transition-colors ${selectedIds.length > 0 ? "border border-gray-300 bg-white text-gray-700 hover:bg-gray-100" : "cursor-not-allowed border-transparent bg-gray-200 text-gray-400"}`}
                >
                  <FolderOpen size={16} />
                  移动
                </button>

                <button
                  onClick={() => selectedIds.length > 0 && setShowPermissionModal(true)}
                  className={`flex items-center gap-1 rounded-full px-4 py-1.5 font-medium shadow-sm transition-colors ${selectedIds.length > 0 ? "border border-green-300 bg-green-100 text-green-700 hover:bg-green-200" : "cursor-not-allowed bg-gray-200 text-gray-400"}`}
                >
                  <ShieldCheck size={16} />
                  设置权限
                </button>

                <button className="rounded-full border border-gray-200 bg-white p-2 text-red-500 shadow-sm hover:bg-gray-100">
                  <Trash2 size={18} />
                </button>
                <button
                  onClick={selectAll}
                  className="rounded-full bg-[#fcd53f] px-5 py-1.5 font-medium text-black shadow-sm hover:bg-yellow-400"
                >
                  全选
                </button>
                <button
                  onClick={toggleMultiSelect}
                  className="rounded-full bg-cyan-300 px-5 py-1.5 font-medium text-cyan-900 shadow-sm transition-colors hover:bg-cyan-400"
                >
                  取消
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="flex-1 overflow-auto bg-[#eef3fa] p-6">
          {activeTab === "cobuild" && (
            <div className="mb-4 flex items-center gap-2 text-sm text-gray-500">
              <Users size={16} />
              此处显示所有共建者开放权限的文件
            </div>
          )}

          {currentFiles.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-gray-400">
              <FileBox size={48} className="mb-2 opacity-50" />
              <p>当前分类下暂无文件</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {currentFiles.map((file) => (
                <div
                  key={file.id}
                  onClick={() => handleItemClick(file)}
                  className={`relative flex cursor-pointer select-none flex-col items-center rounded-2xl p-3 transition-all ${isMultiSelect ? "hover:bg-blue-50" : "hover:scale-105"} ${selectedIds.includes(file.id) ? "bg-blue-100 shadow-md ring-2 ring-blue-400" : "bg-[#c5d6f0]/40"}`}
                >
                  {isMultiSelect && (
                    <div
                      className={`absolute right-2 top-2 z-20 flex h-5 w-5 items-center justify-center rounded-full border-2 ${selectedIds.includes(file.id) ? "border-blue-500 bg-blue-500 text-white" : "border-gray-400 bg-white/50"}`}
                    >
                      {selectedIds.includes(file.id) && (
                        <div className="h-2.5 w-2.5 rounded-sm bg-white" />
                      )}
                    </div>
                  )}

                  {file.category === "audio" || file.category === "ai_voice" ? (
                    <div className="relative mb-3 flex h-24 w-24 flex-col items-center justify-center overflow-hidden rounded-xl bg-[#a3c2f0]/60 text-white shadow-sm">
                      <Volume2 className="absolute left-2 top-2 text-gray-600" size={14} />
                      <span className="absolute right-2 top-2 rounded-full bg-white/40 px-1.5 text-[10px] text-gray-700">
                        {file.formatTag}
                      </span>
                      <div className="mt-2 flex h-6 items-center gap-[3px] opacity-80">
                        <div className="h-3 w-1 rounded-full bg-white" />
                        <div className="h-5 w-1 rounded-full bg-white" />
                        <div className="h-8 w-1 rounded-full bg-white" />
                        <div className="h-4 w-1 rounded-full bg-white" />
                        <div className="h-6 w-1 rounded-full bg-white" />
                      </div>
                      <span className="absolute bottom-1.5 text-xs font-medium text-gray-600">
                        {file.duration}
                      </span>
                    </div>
                  ) : (
                    <div className="relative mb-3 flex h-24 w-24 items-center justify-center rounded-xl bg-white/60 text-5xl shadow-sm">
                      <span className="emoji-art leading-none">{file.emoji}</span>
                      {file.hasCrown && (
                        <div className="absolute -bottom-2 -right-2 text-yellow-500 drop-shadow-md">
                          <Crown size={24} fill="currentColor" />
                        </div>
                      )}
                    </div>
                  )}

                  <span className="w-full truncate text-center font-medium text-gray-700">
                    {file.name}
                  </span>
                  {file.author && <span className="mt-1 text-xs text-gray-400">来自: {file.author}</span>}
                </div>
              ))}
            </div>
          )}
        </div>

        {showPermissionModal && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="flex w-[480px] flex-col overflow-hidden rounded-2xl bg-white shadow-xl">
              <div className="flex items-center justify-between border-b bg-gray-50 px-6 py-4">
                <h3 className="flex items-center gap-2 text-lg font-bold text-gray-800">
                  <ShieldCheck className="text-blue-500" />
                  批量设置权限
                </h3>
                <button
                  onClick={() => setShowPermissionModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6">
                <div className="mb-4 text-sm text-gray-500">
                  已选择 <span className="font-bold text-blue-600">{selectedIds.length}</span> 个文件进行统一设置：
                </div>

                <div className="space-y-4">
                  <label className="group flex cursor-pointer items-start gap-3">
                    <input
                      type="radio"
                      name="permission"
                      className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500"
                      checked={permissionLevel === "private"}
                      onChange={() => setPermissionLevel("private")}
                    />
                    <div>
                      <div className="font-medium text-gray-800 group-hover:text-blue-600">
                        仅自己可用
                      </div>
                      <div className="mt-0.5 text-xs text-gray-500">
                        其他共建者无法在共建库中看到并使用这些文件
                      </div>
                    </div>
                  </label>

                  <label className="group flex cursor-pointer items-start gap-3">
                    <input
                      type="radio"
                      name="permission"
                      className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500"
                      checked={permissionLevel === "shared"}
                      onChange={() => setPermissionLevel("shared")}
                    />
                    <div className="w-full">
                      <div className="flex items-center gap-1 font-medium text-gray-800 group-hover:text-blue-600">
                        允许共建者可用
                        <div className="group/tooltip relative flex items-center">
                          <HelpCircle size={14} className="cursor-help text-gray-400" />
                          <div className="absolute bottom-full left-1/2 z-50 mb-2 hidden w-48 -translate-x-1/2 rounded bg-gray-800 p-2 text-xs text-white shadow-lg group-hover/tooltip:block">
                            允许让共建地图的人可以在这张地图使用这些文件
                          </div>
                        </div>
                      </div>
                      <div className="mt-0.5 text-xs text-gray-500">
                        允许让共建地图的人可以在这张地图使用
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3 border-t bg-gray-50 px-6 py-4">
                <button
                  onClick={() => setShowPermissionModal(false)}
                  className="rounded-lg px-5 py-2 font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                  取消
                </button>
                <button
                  onClick={() => {
                    window.alert("权限设置已保存");
                    setShowPermissionModal(false);
                    resetSelectionState();
                  }}
                  className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white shadow-sm transition-colors hover:bg-blue-700"
                >
                  保存设置
                </button>
              </div>
            </div>
          </div>
        )}

        {showMoveModal && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="flex w-[360px] flex-col overflow-hidden rounded-2xl bg-white shadow-xl">
              <div className="border-b px-6 py-4">
                <h3 className="text-lg font-bold text-gray-800">移动至:</h3>
              </div>
              <div className="flex flex-col gap-3 p-6">
                <button className="w-full rounded-full bg-[#fcd53f] py-2 text-center font-bold text-black shadow-sm transition-colors hover:bg-yellow-400">
                  全部
                </button>
                <div className="my-2 h-px w-full bg-gray-200" />
                <div className="flex flex-wrap gap-2">
                  <button className="rounded-full bg-gray-500 px-5 py-2 font-medium text-white transition-colors hover:bg-gray-600">
                    2333
                  </button>
                  <button className="rounded-full bg-gray-500 px-5 py-2 font-medium text-white transition-colors hover:bg-gray-600">
                    53343
                  </button>
                  <button className="rounded-full bg-gray-500 px-5 py-2 font-medium text-white transition-colors hover:bg-gray-600">
                    投入突然
                  </button>
                  <button className="rounded-full bg-gray-500 px-5 py-2 font-bold text-white transition-colors hover:bg-gray-600">
                    +
                  </button>
                </div>
              </div>
              <div className="flex justify-end gap-3 border-t bg-gray-50 px-6 py-4">
                <button
                  onClick={() => setShowMoveModal(false)}
                  className="rounded-lg px-5 py-2 font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                  取消
                </button>
              </div>
            </div>
          </div>
        )}

        {selectedFileDetails && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="relative flex max-w-3xl gap-6 rounded-[32px] border border-white/50 bg-[#e4ebf5] p-6 shadow-2xl">
              <button
                onClick={() => setSelectedFileDetails(null)}
                className="absolute -right-3 -top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full border-[3px] border-[#eef3fa] bg-[#2d2f31] text-[#00f0ff] transition-transform hover:scale-110"
              >
                <X size={16} strokeWidth={3} />
              </button>

              {selectedFileDetails.category === "audio" || selectedFileDetails.category === "ai_voice" ? (
                <div className="relative flex h-[300px] w-[300px] flex-col items-center justify-center rounded-3xl bg-[#b1ccf2] text-white shadow-sm">
                  <div className="flex h-16 items-center gap-1.5 opacity-80">
                    <div className="h-6 w-1.5 rounded-full bg-white" />
                    <div className="h-12 w-1.5 rounded-full bg-white" />
                    <div className="h-16 w-1.5 rounded-full bg-white" />
                    <div className="h-8 w-1.5 rounded-full bg-white" />
                    <div className="h-14 w-1.5 rounded-full bg-white" />
                    <div className="h-5 w-1.5 rounded-full bg-white" />
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-sm font-medium text-gray-600">
                    <div className="flex items-center gap-2">
                      <div className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-white shadow-sm">
                        <PlayCircle size={14} className="ml-0.5 text-gray-700" fill="currentColor" />
                      </div>
                      <span>00:00</span>
                    </div>
                    <span>{selectedFileDetails.details?.duration || "00:00"}</span>
                  </div>
                </div>
              ) : (
                <div className="relative flex h-[300px] w-[300px] items-center justify-center overflow-hidden rounded-3xl bg-white shadow-sm">
                  <span className="emoji-art text-[110px] leading-none">
                    {selectedFileDetails.emoji}
                  </span>
                  {selectedFileDetails.details?.actionLabel && (
                    <button
                      className={`absolute bottom-4 right-4 inline-flex items-center justify-center rounded-full shadow-md transition-transform hover:scale-105 ${getActionButtonSizeClass(selectedFileDetails.details.actionLabel)} ${selectedFileDetails.details.actionStyle}`}
                    >
                      {selectedFileDetails.details.actionLabel}
                    </button>
                  )}
                </div>
              )}

              <div className="flex w-[280px] flex-col">
                <div className="mb-6 flex items-center justify-between rounded-full bg-white px-5 py-3 shadow-sm">
                  <span className="mr-2 truncate font-bold text-gray-700">{selectedFileDetails.name}</span>
                  {activeTab === "my" && (
                    <button className="shrink-0 text-gray-400 transition-colors hover:text-blue-500">
                      <Edit2 size={16} />
                    </button>
                  )}
                </div>

                <div className="flex flex-1 flex-col gap-4 px-2 text-[15px]">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-800">文件大小</span>
                    <span className="text-gray-600">{selectedFileDetails.details?.size || "未知"}</span>
                  </div>

                  {selectedFileDetails.category === "audio" || selectedFileDetails.category === "ai_voice" ? (
                    <>
                      {selectedFileDetails.details?.duration && (
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-gray-800">音频长度</span>
                          <span className="text-gray-600">{selectedFileDetails.details.duration}</span>
                        </div>
                      )}
                      {selectedFileDetails.details?.format && (
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-gray-800">音频格式</span>
                          <span className="text-gray-600">{selectedFileDetails.details.format}</span>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      {selectedFileDetails.details?.dimensions && (
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-gray-800">图片尺寸</span>
                          <span className="text-gray-600">{selectedFileDetails.details.dimensions}</span>
                        </div>
                      )}
                      {selectedFileDetails.details?.textureSize && (
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-gray-800">贴图文件</span>
                          <span className="text-gray-600">{selectedFileDetails.details.textureSize}</span>
                        </div>
                      )}
                      {selectedFileDetails.details?.animSize && (
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-gray-800">动画文件</span>
                          <span className="text-gray-600">{selectedFileDetails.details.animSize}</span>
                        </div>
                      )}
                      {selectedFileDetails.details?.format && (
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-gray-800">文件格式</span>
                          <span className="text-gray-600">{selectedFileDetails.details.format}</span>
                        </div>
                      )}
                    </>
                  )}

                  {activeTab === "my" && selectedFileDetails.details?.refCount !== undefined && (
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-gray-800">引用地图数</span>
                      <span className="text-gray-600">{selectedFileDetails.details.refCount}</span>
                    </div>
                  )}
                </div>

                <div className="mt-auto flex h-10 items-center justify-end gap-3">
                  {activeTab === "my" && (
                    <>
                      <button className="flex h-10 w-10 items-center justify-center rounded-full border border-transparent bg-white text-gray-700 shadow-sm transition-colors hover:border-gray-200 hover:bg-gray-50">
                        <Tag size={18} fill="currentColor" className="text-gray-600" />
                      </button>
                      <button className="flex h-10 w-10 items-center justify-center rounded-full border border-transparent bg-white text-gray-700 shadow-sm transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-500">
                        <Trash2 size={18} />
                      </button>
                      <button className="flex h-10 items-center justify-center rounded-full bg-[#fcd53f] px-5 font-bold text-black shadow-sm transition-colors hover:bg-yellow-400">
                        查看引用
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function NavItem({ icon, label, active, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`flex cursor-pointer items-center gap-3 px-6 py-3 transition-colors ${active ? "bg-[#fcd53f] font-bold text-black" : "hover:bg-gray-700"}`}
    >
      {icon}
      <span>{label}</span>
    </div>
  );
}
