import React, { useState } from 'react';
import TimezoneWidget from './components/TimezoneWidget';
import WeChatTheme from './components/WeChatTheme';

type Theme = 'default' | 'wechat';

function App() {
  const [currentTheme, setCurrentTheme] = useState<Theme>('wechat');

  return (
    <div className="min-h-screen">
      {/* 主题切换器 */}
      <div className="fixed top-4 right-4 z-10">
        <div className="bg-white rounded-full shadow-lg border border-gray-200 p-1">
          <div className="flex space-x-1">
            <button
              onClick={() => setCurrentTheme('default')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                currentTheme === 'default'
                  ? 'bg-blue-500 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              默认主题
            </button>
            <button
              onClick={() => setCurrentTheme('wechat')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                currentTheme === 'wechat'
                  ? 'bg-green-500 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              微信主题
            </button>
          </div>
        </div>
      </div>

      {/* 主题内容 */}
      {currentTheme === 'default' ? (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-12 px-4">
          <TimezoneWidget />
        </div>
      ) : (
        <WeChatTheme />
      )}
    </div>
  );
}

export default App;
