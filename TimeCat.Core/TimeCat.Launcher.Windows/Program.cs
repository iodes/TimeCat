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
            if (!File.Exists(coreFile))
            {
                MessageBox.Show("TimeCat을 찾을 수 없습니다", "TimeCat", MessageBoxButtons.OK, MessageBoxIcon.Exclamation);
                return;
            }
            
            StartCore();

#if DEBUG
            if (!File.Exists(uiFile))
                return;
#endif

            StartUI();
        }

        private static void StartCore()
        {
#if DEBUG
            Process.Start(coreFile);
#else
            Process.Start(new ProcessStartInfo(coreFile)
            {
                CreateNoWindow = true
            });
#endif
        }

        private static void StartUI()
        {
            Process.Start(uiFile);
        }
    }
}
