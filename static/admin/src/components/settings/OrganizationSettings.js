import React from 'react';

function OrganizationSettings({ settings, onUpdate }) {
  const handleChange = (key, value) => {
    onUpdate({ [key]: value });
  };

  return (
    <div className="settings-section">
      <h2>조직 페이지 설정</h2>
      
      <div className="setting-item">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={settings.enableOrganization}
            onChange={(e) => handleChange('enableOrganization', e.target.checked)}
          />
          <span>조직 페이지 활성화</span>
        </label>
        <small>조직 페이지를 활성화하여 사용자가 접근할 수 있도록 합니다.</small>
      </div>

      <div className="setting-item">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={settings.showCategory}
            onChange={(e) => handleChange('showCategory', e.target.checked)}
          />
          <span>카테고리 컬럼 표시</span>
        </label>
        <small>조직 테이블에 카테고리 컬럼을 표시합니다.</small>
      </div>

      <div className="setting-item">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={settings.enableLinks}
            onChange={(e) => handleChange('enableLinks', e.target.checked)}
          />
          <span>조직 링크 활성화</span>
        </label>
        <small>조직명을 클릭할 수 있는 링크로 표시합니다.</small>
      </div>
    </div>
  );
}

export default OrganizationSettings;