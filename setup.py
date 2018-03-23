from setuptools import setup, find_packages

version = 1.0

setup(name='affinitic.theme',
      version=version,
      description='Affinitic Theme',
      long_description=open('README.rst').read() + '\n' +
      open('CHANGES.rst').read(),
      # Get more strings from
      # http://pypi.python.org/pypi?%3Aaction=list_classifiers
      classifiers=[
          'Environment :: Web Environment',
          'Framework :: Plone',
          'Programming Language :: Python',
          'Topic :: Software Development :: Libraries :: Python Modules',
      ],
      keywords='affinitic diazo theme',
      author='Affinitic',
      author_email='info@affinitic.be',
      url='https://github.com/affinitic/affinitic.theme',
      license='GPL',
      packages=find_packages('src', exclude=['ez_setup']),
      package_dir={'': 'src'},
      namespace_packages=['affinitic'],
      include_package_data=True,
      zip_safe=False,
      install_requires=[
          'setuptools',
          'plone.app.themingplugins',
          'z3c.jbot',
          'collective.themefragments',
          # -*- Extra requirements: -*-
      ])
