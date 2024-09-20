import { tabScreens } from '@/components/MockData';
import { Colors } from '@/constants/Colors';
import { Tabs } from 'expo-router';
import { View } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          const screen = tabScreens.find(screen => screen.name === route.name);
          if (!screen) return null;

          const IconComponent = focused ? screen.IconActive : screen.Icon;

          if (route.name === 'qr-pay-scan') {
            return (
              <View
                style={{
                  position: 'absolute',
                  bottom: 25,
                  height: 64,
                  width: 64,
                  borderRadius: 100,
                  backgroundColor: '#5E6FFF',
                  justifyContent: 'center',
                  alignItems: 'center',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.15,
                  shadowRadius: 3.84,
                  elevation: 3
                }}
              >
                <IconComponent width={32} height={32} />
              </View>
            );
          }

          return <IconComponent />;
        },
        tabBarLabelStyle: {
          fontFamily: 'PlusJakartaSans_semibold',
          fontSize: 10,
          fontWeight: '600'
        },
        tabBarStyle:
          route.name === 'qr-pay-scan'
            ? { display: 'none' }
            : {
                height: 80,
                paddingBottom: 10,
                paddingTop: 10,
                position: 'relative'
              },
        tabBarActiveTintColor: Colors.light.tabIconSelected,
        tabBarInactiveTintColor: Colors.light.tabIconDefault
      })}
    >
      {tabScreens.map(screen => (
        <Tabs.Screen
          key={screen.name}
          name={screen.name}
          options={{
            headerShown: false,
            title: screen.title
          }}
        />
      ))}
    </Tabs>
  );
}
