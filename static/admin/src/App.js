import React, { useState, useEffect } from 'react';
import { invoke } from '@forge/bridge';
import './App.css';

function App() {
  const [settings, setSettings] = useState({
    appName: 'HMG Index',
    enableNotifications: true,
    organizationSync: false,
    maxNotices: 10
  });
  
  const [message, setMessage] = useState('');

  useEffect(() => {
    // 설정 로드
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      // 실제 구현에서는 Forge Storage에서 설정을 불러옴
      console.log('Loading settings...');
      setMessage('설정을 불러왔습니다.');
    } catch (error) {
      setMessage('설정 로드 중 오류가 발생했습니다.');
    }
  };

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const saveSettings = async () => {
    try {
      // 실제 구현에서는 Forge Storage에 설정을 저장
      console.log('Saving settings:', settings);
      setMessage('설정이 저장되었습니다.');
    } catch (error) {
      setMessage('설정 저장 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="admin-app">
      <div className="admin-container">
        <header className="admin-header">
          <h1>🏢 HMG Index 관리자 설정</h1>
          <p>앱의 설정을 관리하고 구성할 수 있습니다.</p>
        </header>

        <main className="admin-content">
          {message && (
            <div className="message-box">
              {message}
            </div>
          )}

          <div className="settings-section">
            <h2>기본 설정</h2>
            
            <div className="setting-item">
              <label htmlFor="appName">앱 이름</label>
              <input
                type="text"
                id="appName"
                value={settings.appName}
                onChange={(e) => handleSettingChange('appName', e.target.value)}
                placeholder="앱 이름을 입력하세요"
              />
              <small>Confluence에서 표시될 앱의 이름입니다.</small>
            </div>

            <div className="setting-item">
              <label htmlFor="maxNotices">최대 공지사항 수</label>
              <input
                type="number"
                id="maxNotices"
                value={settings.maxNotices}
                onChange={(e) => handleSettingChange('maxNotices', parseInt(e.target.value))}
                min="1"
                max="50"
              />
              <small>홈 화면에 표시될 최대 공지사항 개수입니다.</small>
            </div>
          </div>

          <div className="settings-section">
            <h2>기능 설정</h2>
            
            <div className="setting-item">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={settings.enableNotifications}
                  onChange={(e) => handleSettingChange('enableNotifications', e.target.checked)}
                />
                <span className="checkmark"></span>
                알림 기능 사용
              </label>
              <small>새로운 공지사항이 있을 때 사용자에게 알림을 보냅니다.</small>
            </div>

            <div className="setting-item">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={settings.organizationSync}
                  onChange={(e) => handleSettingChange('organizationSync', e.target.checked)}
                />
                <span className="checkmark"></span>
                조직 정보 자동 동기화
              </label>
              <small>외부 시스템과 조직 정보를 자동으로 동기화합니다.</small>
            </div>
          </div>

          <div className="admin-actions">
            <button className="save-btn" onClick={saveSettings}>
              💾 설정 저장
            </button>
            <button className="reset-btn" onClick={loadSettings}>
              🔄 설정 초기화
            </button>
          </div>

          <div className="info-section">
            <h3>📊 시스템 정보</h3>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">앱 버전:</span>
                <span className="info-value">1.1.10</span>
              </div>
              <div className="info-item">
                <span className="info-label">마지막 업데이트:</span>
                <span className="info-value">2025-06-25</span>
              </div>
              <div className="info-item">
                <span className="info-label">활성 사용자:</span>
                <span className="info-value">-</span>
              </div>
              <div className="info-item">
                <span className="info-label">데이터 소스:</span>
                <span className="info-value">Confluence Space</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;