import React, { useState, useEffect } from 'react';

interface Timezone {
  id: string;
  name: string;
  timezone: string;
  offset: string;
}

const TimezoneWidget: React.FC = () => {
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
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">时区小挂件</h1>
        <p className="text-gray-600">实时显示全球主要城市时间</p>
      </div>

      {/* 添加时区表单 */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">添加时区</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              时区名称
            </label>
            <input
              type="text"
              value={newTimezoneName}
              onChange={(e) => setNewTimezoneName(e.target.value)}
              placeholder="例如：旧金山"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              选择时区
            </label>
            <select
              value={newTimezone}
              onChange={(e) => setNewTimezone(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">请选择时区</option>
              {commonTimezones.map(tz => (
                <option key={tz.timezone} value={tz.timezone}>
                  {tz.name} ({tz.offset})
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={addTimezone}
              disabled={!newTimezone || !newTimezoneName}
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              添加
            </button>
          </div>
        </div>
      </div>

      {/* 时区显示区域 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {timezones.map(tz => (
          <div
            key={tz.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{tz.name}</h3>
                <p className="text-sm text-gray-500">
                  {tz.timezone} (UTC{tz.offset})
                </p>
              </div>
              <button
                onClick={() => removeTimezone(tz.id)}
                className="text-red-500 hover:text-red-700 transition-colors"
                title="删除时区"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="text-center">
              <div className="text-2xl font-mono text-gray-800 mb-2">
                {currentTimes[tz.id] || '加载中...'}
              </div>
              <div className="text-sm text-gray-500">
                实时更新
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 空状态 */}
      {timezones.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-600 mb-2">暂无时区</h3>
          <p className="text-gray-500">请添加上方的时区来开始使用</p>
        </div>
      )}
    </div>
  );
};

export default TimezoneWidget;
