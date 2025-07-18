import { useState } from 'react';
import Navigation from './components/Navigation';
import StudentRegistrationForm from './components/StudentRegistrationForm';
import StudentList from './components/StudentList';

function App() {
  const [activeTab, setActiveTab] = useState<'register' | 'list'>('register');

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="py-8">
        {activeTab === 'register' ? (
          <StudentRegistrationForm />
        ) : (
          <StudentList />
        )}
      </main>
    </div>
  );
}

export default App;
