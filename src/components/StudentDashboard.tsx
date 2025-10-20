
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, BookOpen, Award, MapPin } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface StudentDashboardProps {
  userData?: {
    name: string;
    email: string;
    userType: string;
  };
}

const StudentDashboard = ({ userData }: StudentDashboardProps) => {
  const isMobile = useIsMobile();

  const studentInfo = {
    name: userData?.name || 'Estudante',
    program: 'Intercâmbio Canadá - Toronto',
    status: 'Ativo',
    startDate: '2024-01-15',
    endDate: '2024-12-15'
  };

  const schedule = [
    { time: '09:00', subject: 'Advanced English', room: 'A-101', professor: 'Dr. Smith' },
    { time: '11:00', subject: 'Canadian Culture', room: 'B-203', professor: 'Prof. Johnson' },
    { time: '14:00', subject: 'Business Communication', room: 'C-305', professor: 'Ms. Wilson' },
    { time: '16:00', subject: 'Study Group', room: 'Library', professor: 'Self-study' }
  ];

  const grades = [
    { subject: 'Advanced English', grade: 'A-', points: 87 },
    { subject: 'Canadian Culture', grade: 'B+', points: 83 },
    { subject: 'Business Communication', grade: 'A', points: 92 },
    { subject: 'Research Methods', grade: 'B', points: 78 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Olá, {studentInfo.name}! 👋
              </h1>
              <p className="text-gray-600 mt-1">{studentInfo.program}</p>
            </div>
            <Badge className="bg-green-100 text-green-800 mt-2 md:mt-0 self-start">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
              {studentInfo.status}
            </Badge>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Today's Schedule */}
          <Card className="md:col-span-2 lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-blue-500" />
                <span>Horário de Hoje</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {schedule.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="bg-blue-100 rounded-lg p-2 min-w-[60px] text-center">
                      <div className="text-sm font-semibold text-blue-700">{item.time}</div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 truncate">{item.subject}</h4>
                      <p className="text-sm text-gray-600">{item.room} • {item.professor}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-green-500" />
                <span>Estatísticas</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Média Geral</span>
                  <span className="font-bold text-green-600">85%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Disciplinas</span>
                  <span className="font-bold text-blue-600">4</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Frequência</span>
                  <span className="font-bold text-purple-600">96%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Dias Restantes</span>
                  <span className="font-bold text-orange-600">234</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Program Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-red-500" />
                <span>Programa</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Início</p>
                  <p className="font-medium">15 Jan 2024</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Término</p>
                  <p className="font-medium">15 Dez 2024</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Instituição</p>
                  <p className="font-medium">University of Toronto</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Coordinador</p>
                  <p className="font-medium">Prof. Michael Brown</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Grades */}
          <Card className="md:col-span-2 lg:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5 text-purple-500" />
                <span>Boletim - Notas Recentes</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {grades.map((grade, index) => (
                  <div key={index} className="bg-gradient-to-r from-gray-50 to-white rounded-lg p-4 border border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-2 truncate">{grade.subject}</h4>
                    <div className="flex items-center justify-between">
                      <span className={`text-2xl font-bold ${
                        grade.points >= 90 ? 'text-green-600' :
                        grade.points >= 80 ? 'text-blue-600' :
                        grade.points >= 70 ? 'text-orange-600' : 'text-red-600'
                      }`}>
                        {grade.grade}
                      </span>
                      <span className="text-lg text-gray-600">{grade.points}</span>
                    </div>
                    <div className="mt-2 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          grade.points >= 90 ? 'bg-green-500' :
                          grade.points >= 80 ? 'bg-blue-500' :
                          grade.points >= 70 ? 'bg-orange-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${grade.points}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
