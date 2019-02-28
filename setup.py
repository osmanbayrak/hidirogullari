from setuptools import setup, find_packages
__author__ = 'YET'
with open('README.md') as fp:
    long_description = fp.read()
setup(
    name='lottcp-ui',
    url='https://bitbucket.org/sekomy/iot-consumer-portal-ui',
    author='Sekom Yazilim',
    author_email='info@sekomyazilim.com.tr',
    license='MIT',
    description='IOT Consumer Portal',
    long_description=long_description,
    packages=find_packages(exclude=['docs', 'tests*']),
    include_package_data=True,
    install_requires=[
    ],
    setup_requires=[
        'setuptools-sky'
    ],
    use_sky_version={
        'write_to': 'version.txt'
    }
)