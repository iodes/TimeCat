using System;
using System.Diagnostics;
using System.IO;
using System.Windows.Forms;

namespace TimeCat.Launcher.Windows
{
    static class Program
    {
        private const string coreFile = "TimeCat.Core.exe";
        private const string uiFile = "TimeCat.UI.exe";
        
        [STAThread]
        static void Main()
        {
            if (!File.Exists(coreFile) || !File.Exists(uiFile))
            {
                MessageBox.Show("파일을 찾을 수 없습니다", "TimeCat", MessageBoxButtons.OK, MessageBoxIcon.Exclamation);
                return;
            }
            
            StartCore();
            StartUI();
        }

        private static void StartCore()
        {
            Process.Start(coreFile);
        }

        private static void StartUI()
        {
            Process.Start(uiFile);
        }
    }
}
