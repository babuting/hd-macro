import React, { useEffect, useState } from 'react';
import { invoke } from '@forge/bridge';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [activeMenu, setActiveMenu] = useState('Home');

  useEffect(() => {
    invoke('getText', { example: 'my-invoke-variable' }).then(setData);
  }, []);

  const handleMenuClick = (menuItem) => {
    setActiveMenu(menuItem);
  };

  const renderHomeContent = () => {
    const recentNotices = [
      {
        space: 'COMMONGUIDE',
        summary: '(2025.05.19) Bi Weekly Report of ICT',
        updated: '2025-05-19',
        creator: '김동진 책임매니저 IT정책지원팀'
      },
      {
        space: 'COMMONGUIDE', 
        summary: '(2025.05.04) Bi Weekly Report of ICT',
        updated: '2025-05-02',
        creator: '차협성 팀장 IT정책지원팀'
      },
      {
        space: 'COMMONGUIDE',
        summary: '미래차전력협의회 운영방안 공지',
        updated: '2025-04-29', 
        creator: '김동진 책임매니저 IT정책지원팀'
      },
      {
        space: 'COMMONGUIDE',
        summary: 'Global IT Forum 2025',
        updated: '2025-04-10',
        creator: '차협성 팀장 IT정책지원팀'
      },
      {
        space: 'COMMONGUIDE',
        summary: '25년 UML 교육 후기',
        updated: '2025-04-03',
        creator: '김동진 책임매니저 IT정책지원팀'
      }
    ];

    return (
      <>
        {/* Welcome Section */}
        <section className="welcome-section">
          <h2>Welcome to HMG Index</h2>
          <p>현대자동차그룹의 혁신을 이끄는 통합정보 인덱스페이지 입니다.</p>
        </section>

        {/* Action Buttons */}
        <section className="action-buttons">
          <button className="action-btn">
            <span className="icon">🔍</span>
            스페이스 검색
          </button>
          <button className="action-btn">
            <span className="icon">📄</span>
            문서 검색
          </button>
          <button className="action-btn">
            <span className="icon">👥</span>
            공간 관리자 확인
          </button>
          <button className="action-btn">
            <span className="icon">📊</span>
            나의 조치도
          </button>
        </section>

        {/* Recent Notice */}
        <section className="recent-notice">
          <h3>Recent Notice</h3>
          <div className="notice-table">
            <div className="table-header">
              <div className="col-space">Space</div>
              <div className="col-summary">Summary</div>
              <div className="col-updated">Updated</div>
              <div className="col-creator">Creator</div>
            </div>
            {recentNotices.map((notice, index) => (
              <div key={index} className="table-row">
                <div className="col-space">
                  <a href="#" className="space-link">{notice.space}</a>
                </div>
                <div className="col-summary">
                  <a href="#" className="summary-link">{notice.summary}</a>
                </div>
                <div className="col-updated">{notice.updated}</div>
                <div className="col-creator">{notice.creator}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Cards */}
        <section className="bottom-cards">
          <div className="card">
            <div className="card-icon">💻</div>
            <h4>IT Services</h4>
            <p>IT 서비스 관리</p>
          </div>
          <div className="card">
            <div className="card-icon">🚀</div>
            <h4>Innovation</h4>
            <p>혁신 프로젝트</p>
          </div>
          <div className="card">
            <div className="card-icon">📚</div>
            <h4>Knowledge Base</h4>
            <p>지식 관리 시스템</p>
          </div>
        </section>
      </>
    );
  };

  const renderOrganizationContent = () => {
    return (
      <section className="page-content">
        <div className="page-header">
          <h2>Organization</h2>
          <p>조직 구조 및 부서 정보를 확인할 수 있습니다.</p>
        </div>
        <div className="empty-content">
          <div className="empty-icon">🏢</div>
          <p>Organization 페이지 준비 중입니다.</p>
        </div>
      </section>
    );
  };

  const renderProjectsContent = () => {
    return (
      <section className="page-content">
        <div className="page-header">
          <h2>Projects</h2>
          <p>진행 중인 프로젝트와 관련 정보를 관리합니다.</p>
        </div>
        <div className="empty-content">
          <div className="empty-icon">📋</div>
          <p>Projects 페이지 준비 중입니다.</p>
        </div>
      </section>
    );
  };

  const renderNoticeContent = () => {
    return (
      <section className="page-content">
        <div className="page-header">
          <h2>Notice</h2>
          <p>공지사항 및 중요 안내사항을 확인할 수 있습니다.</p>
        </div>
        <div className="empty-content">
          <div className="empty-icon">📢</div>
          <p>Notice 페이지 준비 중입니다.</p>
        </div>
      </section>
    );
  };

  const renderServiceRequestContent = () => {
    return (
      <section className="page-content">
        <div className="page-header">
          <h2>Service Request</h2>
          <p>서비스 요청 및 지원을 받을 수 있습니다.</p>
        </div>
        <div className="empty-content">
          <div className="empty-icon">🎫</div>
          <p>Service Request 페이지 준비 중입니다.</p>
        </div>
      </section>
    );
  };

  const renderHelpCenterContent = () => {
    return (
      <section className="page-content">
        <div className="page-header">
          <h2>Help Center</h2>
          <p>도움말 및 자주 묻는 질문을 확인할 수 있습니다.</p>
        </div>
        <div className="empty-content">
          <div className="empty-icon">❓</div>
          <p>Help Center 페이지 준비 중입니다.</p>
        </div>
      </section>
    );
  };

  const renderContent = () => {
    switch(activeMenu) {
      case 'Home':
        return renderHomeContent();
      case 'Organization':
        return renderOrganizationContent();
      case 'Projects':
        return renderProjectsContent();
      case 'Notice':
        return renderNoticeContent();
      case 'Service Request':
        return renderServiceRequestContent();
      case 'Help Center':
        return renderHelpCenterContent();
      default:
        return renderHomeContent();
    }
  };

  const menuItems = ['Home', 'Organization', 'Projects', 'Notice', 'Service Request', 'Help Center'];

  return (
    <div className="hmg-index">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="header-left">
            <h1 className="main-title">HMG Index</h1>
            <p className="sub-title">HYUNDAI MOTOR GROUP</p>
          </div>
          <div className="header-right">
            <span className="language-selector">
              <span className="active">KR</span> | <span>EN</span>
            </span>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="navigation">
        <ul className="nav-list">
          {menuItems.map((item) => (
            <li 
              key={item}
              className={`nav-item ${activeMenu === item ? 'active' : ''}`}
              onClick={() => handleMenuClick(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>📝 Share feedback on Company hub</p>
      </footer>
    </div>
  );
}

export default App;