import { useState } from 'react';
import { Users, Target, Shield, Award, BookOpen, MessageCircle, User, Search, Bell } from 'lucide-react';

interface Module {
  id: number;
  name: string;
  score?: number;
  progress?: number;
  instructor: string;
}

interface ModuleDetailProps {
  module: Module;
  type: 'completed' | 'active';
}

interface ModuleListProps {
  modules: Module[];
  type: 'completed' | 'active';
  title: string;
}

const MiliSkill = () => {
  const [activeRole, setActiveRole] = useState('recruit');
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);

  const moduleData = {
    completed: [
      { id: 1, name: "Grundlæggende Militær Træning", score: 92, instructor: "Sgt. Larsen" },
      { id: 2, name: "Førstehjælp Niveau 1", score: 88, instructor: "Korporal Nielsen" },
      { id: 3, name: "Våbenhåndtering Basis", score: 95, instructor: "Sgt. Hansen" }
    ] as Module[],
    active: [
      { id: 4, name: "Køretøjsføring Nivå 2", progress: 78, instructor: "Sgt. Petersen" },
      { id: 5, name: "Taktik & Strategi", progress: 45, instructor: "Løjtnant Skov" },
      { id: 6, name: "Teamwork & Ledelse", progress: 23, instructor: "Kaptajn Berg" }
    ] as Module[]
  };

  const ModuleDetail = ({ module, type }: ModuleDetailProps) => (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <button 
        onClick={() => setCurrentView('dashboard')}
        className="mb-4 text-blue-600 hover:text-blue-800"
      >
        ← Tilbage til Dashboard
      </button>
      
      <h2 className="text-2xl font-bold mb-4">{module.name}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">
            {type === 'completed' ? 'Resultat' : 'Fremgang'}
          </h3>
          <div className="text-2xl font-bold text-blue-600">
            {type === 'completed' ? `${module.score}%` : `${module.progress}%`}
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Instruktør</h3>
          <p>{module.instructor}</p>
        </div>
      </div>
      
      {type === 'active' && (
        <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Fortsæt Træning
        </button>
      )}
    </div>
  );

  const ModuleList = ({ modules, type, title }: ModuleListProps) => (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <button 
        onClick={() => setCurrentView('dashboard')}
        className="mb-4 text-blue-600 hover:text-blue-800"
      >
        ← Tilbage til Dashboard
      </button>
      
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      
      <div className="space-y-3">
        {modules.map((module: Module) => (
          <div 
            key={module.id}
            onClick={() => {
              setSelectedModule(module);
              setCurrentView('module-detail');
            }}
            className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">{module.name}</h3>
              <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                {type === 'completed' ? `${module.score}%` : `${module.progress}%`}
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-1">Instruktør: {module.instructor}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const RecruitDashboard = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Target className="mr-2 text-blue-600" size={20} />
            Min Uddannelsesplan
          </h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Samlet Fremgang</span>
              <span className="font-semibold">65%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-blue-600 h-3 rounded-full" style={{width: '65%'}}></div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-6">
              <button 
                onClick={() => setCurrentView('completed-modules')}
                className="bg-green-50 p-4 rounded-lg hover:bg-green-100"
              >
                <div className="flex items-center justify-between">
                  <Award className="text-green-600" size={24} />
                  <span className="text-2xl font-bold text-green-600">3</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">Gennemførte Moduler</p>
              </button>
              
              <button 
                onClick={() => setCurrentView('active-modules')}
                className="bg-orange-50 p-4 rounded-lg hover:bg-orange-100"
              >
                <div className="flex items-center justify-between">
                  <BookOpen className="text-orange-600" size={24} />
                  <span className="text-2xl font-bold text-orange-600">3</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">Aktive Moduler</p>
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold mb-4">Aktuelt Forløb</h3>
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900">Køretøjsføring Nivå 2</h4>
            <p className="text-blue-700 text-sm mt-1">Tunge køretøjer og specialudstyr</p>
            <div className="mt-3 flex justify-between items-center">
              <span className="text-sm text-blue-600">Fremgang: 78%</span>
              <button 
                onClick={() => {
                  setSelectedModule(moduleData.active[0]);
                  setCurrentView('module-detail');
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
              >
                Fortsæt Træning
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <MessageCircle className="mr-2 text-green-600" size={20} />
            MiliLife Chat
          </h3>
          <div className="space-y-3">
            <button className="w-full bg-green-50 hover:bg-green-100 p-3 rounded-lg text-left">
              <p className="text-sm font-medium">Uddannelsesvejleder</p>
              <p className="text-xs text-gray-600">Få rådgivning om din karrierevej</p>
            </button>
            <button className="w-full bg-blue-50 hover:bg-blue-100 p-3 rounded-lg text-left">
              <p className="text-sm font-medium">AI Assistant</p>
              <p className="text-xs text-gray-600">Spørgsmål om procedurer og regler</p>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold mb-4">Karrieremuligheder</h3>
          <div className="space-y-2">
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="font-medium text-sm">Tankspecialist</p>
              <p className="text-xs text-gray-600">Kræver 2 yderligere moduler</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="font-medium text-sm">Uddannelsesinstruktør</p>
              <p className="text-xs text-gray-600">Kræver ledermodul</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const InstructorDashboard = () => (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Users className="mr-2 text-blue-600" size={20} />
        Mine Rekrutter (24 aktive)
      </h3>
      <p className="text-gray-600">Instruktør dashboard kommer her...</p>
    </div>
  );

  const CommandDashboard = () => (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Shield className="mr-2 text-blue-600" size={20} />
        Kommando Center
      </h3>
      <p className="text-gray-600">Kommando dashboard kommer her...</p>
    </div>
  );

  const renderContent = () => {
    if (currentView === 'completed-modules') {
      return <ModuleList modules={moduleData.completed} type="completed" title="Gennemførte Moduler" />;
    }
    if (currentView === 'active-modules') {
      return <ModuleList modules={moduleData.active} type="active" title="Aktive Moduler" />;
    }
    if (currentView === 'module-detail' && selectedModule) {
      const type = moduleData.completed.includes(selectedModule) ? 'completed' : 'active';
      return <ModuleDetail module={selectedModule} type={type} />;
    }
    
    // Dashboard views
    if (activeRole === 'recruit') return <RecruitDashboard />;
    if (activeRole === 'instructor') return <InstructorDashboard />;
    if (activeRole === 'command') return <CommandDashboard />;
    
    return <RecruitDashboard />;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="flex items-center">
                  <img 
                    src="/MilliSkill logo.png" 
                    alt="MilliSkill Logo" 
                    className="h-12 w-auto mr-3"
                  />
                </div>
              </div>
              
              <div className="hidden md:flex space-x-1">
                <button
                  onClick={() => {setActiveRole('recruit'); setCurrentView('dashboard');}}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    activeRole === 'recruit' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Rekrut View
                </button>
                <button
                  onClick={() => {setActiveRole('instructor'); setCurrentView('dashboard');}}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    activeRole === 'instructor' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Instruktør View
                </button>
                <button
                  onClick={() => {setActiveRole('command'); setCurrentView('dashboard');}}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    activeRole === 'command' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Kommando View
                </button>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Search className="text-gray-400 cursor-pointer hover:text-gray-600" size={20} />
              <Bell className="text-gray-400 cursor-pointer hover:text-gray-600" size={20} />
              <div className="flex items-center space-x-2">
                <User className="text-gray-400" size={20} />
                <span className="text-sm font-medium text-gray-700">Rekrut Jensen</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {currentView === 'dashboard' && activeRole === 'recruit' && 'Mit Dashboard'}
            {currentView === 'dashboard' && activeRole === 'instructor' && 'Uddannelsesoversigt'}
            {currentView === 'dashboard' && activeRole === 'command' && 'Kommando Center'}
            {currentView === 'completed-modules' && 'Gennemførte Moduler'}
            {currentView === 'active-modules' && 'Aktive Moduler'}
            {currentView === 'module-detail' && selectedModule?.name}
          </h2>
        </div>

        {renderContent()}
      </main>
    </div>
  );
};

export default MiliSkill; 