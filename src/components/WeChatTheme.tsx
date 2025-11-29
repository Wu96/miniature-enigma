import React, { useState, useEffect } from 'react';

interface Timezone {
  id: string;
  name: string;
  timezone: string;
  offset: string;
}

const WeChatTheme: React.FC = () => {
  const [timezones, setTimezones] = useState<Timezone[]>([
    { id: '1', name: '北京', timezone: 'Asia/Shanghai', offset: '+08:00' },
    { id: '2', name: '纽约', timezone: 'America/New_York', offset: '-05:00' },
    { id: '3', name: '伦敦', timezone: 'Europe/London', offset: '+00:00' },
    { id: '4', name: '东京', timezone: 'Asia/Tokyo', offset: '+09:00' },
  ]);

  const [currentTimes, setCurrentTimes] = useState<Record<string, string>>({});
  const [newTimezone, setNewTimezone] = useState('');
  const [newTimezoneName, setNewTimezoneName] = useState('');

  // 常用时区列表
  const commonTimezones = [
    { name: '北京', timezone: 'Asia/Shanghai', offset: '+08:00' },
    { name: '纽约', timezone: 'America/New_York', offset: '-05:00' },
    { name: '伦敦', timezone: 'Europe/London', offset: '+00:00' },
    { name: '东京', timezone: 'Asia/Tokyo', offset: '+09:00' },
    { name: '悉尼', timezone: 'Australia/Sydney', offset: '+10:00' },
    { name: '洛杉矶', timezone: 'America/Los_Angeles', offset: '-08:00' },
    { name: '巴黎', timezone: 'Europe/Paris', offset: '+01:00' },
    { name: '柏林', timezone: 'Europe/Berlin', offset: '+01:00' },
    { name: '莫斯科', timezone: 'Europe/Moscow', offset: '+03:00' },
    { name: '迪拜', timezone: 'Asia/Dubai', offset: '+04:00' },
  ];

  // 更新时间
  useEffect(() => {
    const updateTimes = () => {
      const times: Record<string, string> = {};
      timezones.forEach(tz => {
        try {
          const time = new Date().toLocaleString('zh-CN', {
            timeZone: tz.timezone,
            hour12: false,
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          });
          times[tz.id] = time;
        } catch (error) {
          times[tz.id] = '时区错误';
        }
      });
      setCurrentTimes(times);
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, [timezones]);

  // 添加时区
  const addTimezone = () => {
    if (newTimezone && newTimezoneName) {
      const selectedTz = commonTimezones.find(tz => tz.timezone === newTimezone);
      if (selectedTz) {
        const newTz: Timezone = {
          id: Date.now().toString(),
          name: newTimezoneName,
          timezone: selectedTz.timezone,
          offset: selectedTz.offset
        };
        setTimezones([...timezones, newTz]);
        setNewTimezone('');
        setNewTimezoneName('');
      }
    }
  };

  // 删除时区
  const removeTimezone = (id: string) => {
    setTimezones(timezones.filter(tz => tz.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* 微信风格顶部栏 */}
      <div className="bg-green-500 text-white py-4 px-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm4 0h-2v-6h2v6z"/>
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-semibold">时区小助手</h1>
              <p className="text-green-100 text-xs">微信主题版</p>
            </div>
          </div>
          <div className="flex space-x-4">
            <button className="text-white hover:text-green-100 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button className="text-white hover:text-green-100 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* 主要内容区域 */}
      <div className="max-w-4xl mx-auto p-4">
        {/* 添加时区卡片 - 微信对话框风格 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex items-center mb-4">
            <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
            <h2 className="text-lg font-medium text-gray-800">添加新时区</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                自定义名称
              </label>
              <input
                type="text"
                value={newTimezoneName}
                onChange={(e) => setNewTimezoneName(e.target.value)}
                placeholder="例如：旧金山办公室"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent bg-gray-50"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                选择城市时区
              </label>
              <select
                value={newTimezone}
                onChange={(e) => setNewTimezone(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent bg-gray-50"
              >
                <option value="">请选择城市</option>
                {commonTimezones.map(tz => (
                  <option key={tz.timezone} value={tz.timezone}>
                    {tz.name} (UTC{tz.offset})
                  </option>
                ))}
              </select>
            </div>
            
            <button
              onClick={addTimezone}
              disabled={!newTimezone || !newTimezoneName}
              className="w-full py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-sm"
            >
              确认添加
            </button>
          </div>
        </div>

        {/* 时区显示区域 - 微信消息气泡风格 */}
        <div className="space-y-4">
          {timezones.map(tz => (
            <div
              key={tz.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-200"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                    {tz.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{tz.name}</h3>
                    <p className="text-sm text-gray-500">
                      {tz.timezone} • UTC{tz.offset}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeTimezone(tz.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50"
                  title="删除时区"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
              
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
                <div className="text-center">
                  <div className="text-2xl font-mono text-gray-800 mb-2 font-medium">
                    {currentTimes[tz.id] || '加载中...'}
                  </div>
                  <div className="text-sm text-green-600 font-medium">
                    🕐 实时同步
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 空状态 */}
        {timezones.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-600 mb-2">还没有添加时区</h3>
            <p className="text-gray-500">点击上方表单添加第一个时区吧</p>
          </div>
        )}

        {/* 底部提示 */}
        <div className="text-center mt-8 pb-8">
          <div className="inline-flex items-center space-x-2 text-gray-400 text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>长按时区卡片可快速删除</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeChatTheme;
