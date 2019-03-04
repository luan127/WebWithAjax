using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Demo1.Startup))]
namespace Demo1
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
