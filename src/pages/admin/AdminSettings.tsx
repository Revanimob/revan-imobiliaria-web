
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    siteName: 'Revan Imobiliária',
    siteDescription: 'A melhor imobiliária da região',
    contactEmail: 'contato@revan.com',
    contactPhone: '(11) 9999-9999',
    address: 'Rua Principal, 123 - Centro',
    socialMedia: {
      facebook: 'https://facebook.com/revan',
      instagram: 'https://instagram.com/revan',
      whatsapp: '5511999999999'
    },
    features: {
      autoBackup: true,
      emailNotifications: true,
      smsNotifications: false,
      analytics: true
    }
  });
  
  const { toast } = useToast();

  const handleSave = () => {
    localStorage.setItem('admin_settings', JSON.stringify(settings));
    toast({ title: "Configurações salvas com sucesso!" });
  };

  const handleBackup = () => {
    const data = {
      properties: JSON.parse(localStorage.getItem('admin_properties') || '[]'),
      users: JSON.parse(localStorage.getItem('admin_users') || '[]'),
      settings: settings,
      timestamp: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `revan-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    
    toast({ title: "Backup gerado com sucesso!" });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Configurações</h1>
          <p className="text-gray-600">Configure as opções gerais do sistema</p>
        </div>

        {/* Site Information */}
        <Card>
          <CardHeader>
            <CardTitle>Informações do Site</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="siteName">Nome do Site</Label>
                <Input
                  id="siteName"
                  value={settings.siteName}
                  onChange={(e) => setSettings({...settings, siteName: e.target.value})}
                />
              </div>
              
              <div>
                <Label htmlFor="contactEmail">E-mail de Contato</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={settings.contactEmail}
                  onChange={(e) => setSettings({...settings, contactEmail: e.target.value})}
                />
              </div>
              
              <div>
                <Label htmlFor="contactPhone">Telefone</Label>
                <Input
                  id="contactPhone"
                  value={settings.contactPhone}
                  onChange={(e) => setSettings({...settings, contactPhone: e.target.value})}
                />
              </div>
              
              <div>
                <Label htmlFor="whatsapp">WhatsApp</Label>
                <Input
                  id="whatsapp"
                  value={settings.socialMedia.whatsapp}
                  onChange={(e) => setSettings({
                    ...settings, 
                    socialMedia: {...settings.socialMedia, whatsapp: e.target.value}
                  })}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="siteDescription">Descrição do Site</Label>
              <Textarea
                id="siteDescription"
                value={settings.siteDescription}
                onChange={(e) => setSettings({...settings, siteDescription: e.target.value})}
                rows={3}
              />
            </div>
            
            <div>
              <Label htmlFor="address">Endereço</Label>
              <Input
                id="address"
                value={settings.address}
                onChange={(e) => setSettings({...settings, address: e.target.value})}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="facebook">Facebook</Label>
                <Input
                  id="facebook"
                  value={settings.socialMedia.facebook}
                  onChange={(e) => setSettings({
                    ...settings, 
                    socialMedia: {...settings.socialMedia, facebook: e.target.value}
                  })}
                />
              </div>
              
              <div>
                <Label htmlFor="instagram">Instagram</Label>
                <Input
                  id="instagram"
                  value={settings.socialMedia.instagram}
                  onChange={(e) => setSettings({
                    ...settings, 
                    socialMedia: {...settings.socialMedia, instagram: e.target.value}
                  })}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Features */}
        <Card>
          <CardHeader>
            <CardTitle>Funcionalidades do Sistema</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="autoBackup">Backup Automático</Label>
                <p className="text-sm text-gray-600">Realiza backup dos dados automaticamente</p>
              </div>
              <Switch
                id="autoBackup"
                checked={settings.features.autoBackup}
                onCheckedChange={(checked) => setSettings({
                  ...settings,
                  features: {...settings.features, autoBackup: checked}
                })}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="emailNotifications">Notificações por E-mail</Label>
                <p className="text-sm text-gray-600">Receber notificações por e-mail</p>
              </div>
              <Switch
                id="emailNotifications"
                checked={settings.features.emailNotifications}
                onCheckedChange={(checked) => setSettings({
                  ...settings,
                  features: {...settings.features, emailNotifications: checked}
                })}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="smsNotifications">Notificações por SMS</Label>
                <p className="text-sm text-gray-600">Receber notificações por SMS</p>
              </div>
              <Switch
                id="smsNotifications"
                checked={settings.features.smsNotifications}
                onCheckedChange={(checked) => setSettings({
                  ...settings,
                  features: {...settings.features, smsNotifications: checked}
                })}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="analytics">Analytics</Label>
                <p className="text-sm text-gray-600">Habilitar coleta de dados analíticos</p>
              </div>
              <Switch
                id="analytics"
                checked={settings.features.analytics}
                onCheckedChange={(checked) => setSettings({
                  ...settings,
                  features: {...settings.features, analytics: checked}
                })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Backup Section */}
        <Card>
          <CardHeader>
            <CardTitle>Backup e Restauração</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">Gerar Backup Manual</h4>
                <p className="text-sm text-gray-600">
                  Baixe um arquivo com todos os dados do sistema
                </p>
              </div>
              <Button onClick={handleBackup} variant="outline">
                Gerar Backup
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">Último Backup</h4>
                <p className="text-sm text-gray-600">
                  Hoje às 03:00 - Backup automático
                </p>
              </div>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                Sucesso
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSave} className="bg-wine hover:bg-wine-dark">
            Salvar Configurações
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
