import { useState, useMemo } from 'react';
import { Country, SortField, SortOrder } from '../types';
import { medalData } from '../data';

const MedalTable = () => {
  const [sortField, setSortField] = useState<SortField>('gold');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [searchTerm, setSearchTerm] = useState('');
  const [showTop3Only, setShowTop3Only] = useState(false);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  // 过滤和排序数据
  const filteredAndSortedData = useMemo(() => {
    let filtered = medalData.filter((country: Country) => 
      country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.code.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (showTop3Only) {
      filtered = filtered.slice(0, 3);
    }

    return [...filtered].sort((a: Country, b: Country) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (sortOrder === 'asc') {
        return aValue - bValue;
      } else {
        return bValue - aValue;
      }
    });
  }, [medalData, sortField, sortOrder, searchTerm, showTop3Only]);

  // 计算统计数据
  const stats = useMemo(() => {
    const totalGold = medalData.reduce((sum: number, country: Country) => sum + country.gold, 0);
    const totalSilver = medalData.reduce((sum: number, country: Country) => sum + country.silver, 0);
    const totalBronze = medalData.reduce((sum: number, country: Country) => sum + country.bronze, 0);
    const totalMedals = medalData.reduce((sum: number, country: Country) => sum + country.total, 0);
    
    return { totalGold, totalSilver, totalBronze, totalMedals };
  }, [medalData]);

  const SortButton = ({ field, label }: { field: SortField; label: string }) => {
    const isActive = sortField === field;
    return (
      <button
        onClick={() => handleSort(field)}
        className={`px-4 py-2 rounded-lg font-semibold transition-all ${
          isActive
            ? 'bg-blue-600 text-white shadow-lg'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        {label}
        {isActive && (
          <span className="ml-2">{sortOrder === 'desc' ? '↓' : '↑'}</span>
        )}
      </button>
    );
  };

  const getRank = (index: number) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return index + 1;
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* 表头 */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6">
          <h1 className="text-3xl font-bold mb-2">🏅 奥运会奖牌榜</h1>
          <p className="text-blue-100">点击列标题进行排序</p>
        </div>

        {/* 控制面板 */}
        <div className="p-6 bg-gray-50 border-b">
          {/* 搜索框 */}
          <div className="mb-4">
            <div className="relative max-w-md">
              <input
                type="text"
                placeholder="搜索国家或地区代码..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-12 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                🔍
              </div>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* 排序按钮组 */}
            <div className="flex flex-wrap gap-3">
              <SortButton field="gold" label="按金牌排序" />
              <SortButton field="silver" label="按银牌排序" />
              <SortButton field="bronze" label="按铜牌排序" />
              <SortButton field="total" label="按总数排序" />
            </div>

            {/* 筛选选项 */}
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showTop3Only}
                  onChange={(e) => setShowTop3Only(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">仅显示前三名</span>
              </label>
            </div>
          </div>
        </div>

        {/* 表格 */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">排名</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">国家/地区</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-200 transition-colors"
                    onClick={() => handleSort('gold')}>
                  <div className="flex items-center justify-center gap-2">
                    <span>🥇 金牌</span>
                    {sortField === 'gold' && (
                      <span>{sortOrder === 'desc' ? '↓' : '↑'}</span>
                    )}
                  </div>
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-200 transition-colors"
                    onClick={() => handleSort('silver')}>
                  <div className="flex items-center justify-center gap-2">
                    <span>🥈 银牌</span>
                    {sortField === 'silver' && (
                      <span>{sortOrder === 'desc' ? '↓' : '↑'}</span>
                    )}
                  </div>
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-200 transition-colors"
                    onClick={() => handleSort('bronze')}>
                  <div className="flex items-center justify-center gap-2">
                    <span>🥉 铜牌</span>
                    {sortField === 'bronze' && (
                      <span>{sortOrder === 'desc' ? '↓' : '↑'}</span>
                    )}
                  </div>
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-200 transition-colors"
                    onClick={() => handleSort('total')}>
                  <div className="flex items-center justify-center gap-2">
                    <span>总计</span>
                    {sortField === 'total' && (
                      <span>{sortOrder === 'desc' ? '↓' : '↑'}</span>
                    )}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredAndSortedData.map((country: Country, index: number) => (
                <tr
                  key={country.id}
                  className={`hover:bg-blue-50 transition-colors ${
                    index < 3 ? 'bg-gradient-to-r from-yellow-50 to-transparent' : ''
                  }`}
                >
                  <td className="px-6 py-4 text-lg font-bold text-gray-800">
                    {getRank(index)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-gray-400">
                        {country.code}
                      </span>
                      <span className="text-lg font-semibold text-gray-800">
                        {country.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-yellow-100 text-yellow-800 font-bold text-lg">
                      {country.gold}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-200 text-gray-700 font-bold text-lg">
                      {country.silver}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-orange-200 text-orange-800 font-bold text-lg">
                      {country.bronze}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center justify-center w-14 h-12 rounded-lg bg-blue-100 text-blue-800 font-bold text-lg">
                      {country.total}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 统计数据 */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-t">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-white rounded-lg p-3 shadow-sm">
              <div className="text-2xl font-bold text-yellow-600">{stats.totalGold}</div>
              <div className="text-sm text-gray-600">总金牌数</div>
            </div>
            <div className="bg-white rounded-lg p-3 shadow-sm">
              <div className="text-2xl font-bold text-gray-500">{stats.totalSilver}</div>
              <div className="text-sm text-gray-600">总银牌数</div>
            </div>
            <div className="bg-white rounded-lg p-3 shadow-sm">
              <div className="text-2xl font-bold text-orange-600">{stats.totalBronze}</div>
              <div className="text-sm text-gray-600">总铜牌数</div>
            </div>
            <div className="bg-white rounded-lg p-3 shadow-sm">
              <div className="text-2xl font-bold text-blue-600">{stats.totalMedals}</div>
              <div className="text-sm text-gray-600">总奖牌数</div>
            </div>
          </div>
        </div>

        {/* 页脚 */}
        <div className="bg-gray-50 px-6 py-4 text-center text-sm text-gray-600">
          <p>数据来源：2020年东京奥运会（示例数据） • 共 {filteredAndSortedData.length} 个国家/地区</p>
        </div>
      </div>
    </div>
  );
};

export default MedalTable;
